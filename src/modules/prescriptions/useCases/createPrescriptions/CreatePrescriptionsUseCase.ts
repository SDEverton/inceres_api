import { AxiosResponse } from 'axios';
import { inject, injectable } from 'tsyringe';

import { Prescriptions } from '@modules/prescriptions/infra/typeorm/entities/Prescriptions';
import { IPrescriptionsRepository } from '@modules/prescriptions/repositories/IPrescriptionsRepository';
import { AppError } from '@shared/errors/AppError';
import { DependentServices } from '@shared/infra/http/DependentServices';

interface IRequest {
  clinic_id?: number;
  physician_id: number;
  patient_id: number;
  text: string;
}

interface IPhysician {
  id: number;
  name: string;
  crm: string;
}

interface IClinic {
  id: number;
  name: string;
}

interface IPatient {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@injectable()
class CreatePrescriptionsUseCase {
  constructor(
    @inject('PrescriptionsRepository')
    private prescriptionsRepository: IPrescriptionsRepository
  ) {}
  async execute({
    clinic_id,
    patient_id,
    physician_id,
    text,
  }: IRequest): Promise<Prescriptions> {
    const createConnection = new DependentServices();

    let physician: AxiosResponse<IPhysician>;
    try {
      physician = await createConnection.execute({
        timeout: 4000,
        token: process.env.PHYSICIANS_TOKEN,
        method: 'GET',
        url: `physicians/${physician_id}`,
        retry: 2,
      });
    } catch (error) {
      throw new AppError('physician not found', 404, '02');
    }

    const clinic: AxiosResponse<IClinic> = await createConnection.execute({
      timeout: 5000,
      token: process.env.CLINICS_TOKEN,
      method: 'GET',
      url: `clinics/${clinic_id}`,
      retry: 3,
    });

    let patient: AxiosResponse<IPatient>;
    try {
      patient = await createConnection.execute({
        timeout: 3000,
        token: process.env.PATIENTS_TOKEN,
        method: 'GET',
        url: `patients/${patient_id}`,
        retry: 2,
      });
    } catch (error) {
      throw new AppError('patients service not available', 404, '03');
    }

    const prescription = await this.prescriptionsRepository.create({
      clinic_id,
      patient_id,
      physician_id,
      text,
    });

    try {
      await createConnection.execute({
        timeout: 100,
        token: process.env.METRICS_TOKEN,
        method: 'POST',
        url: 'https://mysterious-island-73235.herokuapp.com/api/metrics',
        data: {
          clinic_id,
          clinic_name: clinic.data.name,
          physician_id,
          physician_name: physician.data.name,
          physician_crm: physician.data.crm,
          patient_id,
          patient_name: patient.data.name,
          patient_email: patient.data.email,
          patient_phone: patient.data.phone,
        },
        retry: 5,
      });
    } catch (error) {
      await this.prescriptionsRepository.destroy(prescription.id);
      throw new AppError('metrics service not available', 404, '04');
    }

    return prescription;
  }
}

export { CreatePrescriptionsUseCase };
