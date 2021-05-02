import { AxiosResponse } from 'axios';
import { inject, injectable } from 'tsyringe';

import Logger from '@config/logs';
import { IPrescriptionsRepository } from '@modules/prescriptions/repositories/IPrescriptionsRepository';
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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

interface IResponse {
  data: {
    id: string;
    clinic: {
      id: number;
    };
    physician: {
      id: number;
    };
    patient: {
      id: number;
    };
    text: string;
  };
}

@injectable()
class CreatePrescriptionsUseCase {
  constructor(
    @inject('PrescriptionsRepository')
    private prescriptionsRepository: IPrescriptionsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}
  async execute({
    clinic_id,
    patient_id,
    physician_id,
    text,
  }: IRequest): Promise<IResponse> {
    const createConnection = new DependentServices();

    let physician: AxiosResponse<IPhysician>;
    const cachePhysician = await this.cacheProvider.recover(
      `@physician_${physician_id}`
    );

    if (cachePhysician) {
      physician = cachePhysician;
      Logger.info(
        `physician in cache id: ${physician_id} - ${JSON.stringify(
          physician.data
        )}`
      );
    } else {
      try {
        physician = await createConnection.execute({
          timeout: 4000,
          token: process.env.PHYSICIANS_TOKEN,
          method: 'GET',
          url: `physicians/${physician_id}`,
          retry: 2,
        });

        await this.cacheProvider.save(
          `@physician_${physician_id}`,
          JSON.stringify({ data: physician.data }),
          48
        );
        Logger.info(
          `physician send API id: ${physician_id} - ${JSON.stringify(
            physician.data
          )}`
        );
      } catch (error) {
        Logger.error(`physician id: ${physician_id} - ${error}`);
        throw new AppError('physician not found', 404, '02');
      }
    }

    let clinic: AxiosResponse<IClinic>;
    const cacheClinic = await this.cacheProvider.recover(
      `@clinic_${clinic_id}`
    );

    if (cacheClinic) {
      clinic = cacheClinic;
      Logger.info(
        `clinic in cache id: ${clinic_id} - ${JSON.stringify(clinic.data)}`
      );
    } else {
      try {
        clinic = await createConnection.execute({
          timeout: 5000,
          token: process.env.CLINICS_TOKEN,
          method: 'GET',
          url: `clinics/${clinic_id}`,
          retry: 3,
        });

        await this.cacheProvider.save(
          `@clinic_${clinic_id}`,
          JSON.stringify({ data: clinic.data }),
          72
        );

        Logger.info(
          `clinic send API id: ${clinic_id} - ${JSON.stringify(clinic.data)}`
        );
      } catch (error) {
        Logger.error(`clinic id: ${clinic_id} - ${error}`);
      }
    }

    let patient: AxiosResponse<IPatient>;

    const cachePatient = await this.cacheProvider.recover(
      `@patient_${patient_id}`
    );

    if (cachePatient) {
      patient = cachePatient;
      Logger.info(
        `clinic in cache id: ${patient_id} - ${JSON.stringify(patient.data)}`
      );
    } else {
      try {
        patient = await createConnection.execute({
          timeout: 3000,
          token: process.env.PATIENTS_TOKEN,
          method: 'GET',
          url: `patients/${patient_id}`,
          retry: 2,
        });

        await this.cacheProvider.save(
          `@patient_${patient_id}`,
          JSON.stringify({ data: patient.data }),
          12
        );
        Logger.info(
          `clinic send API id: ${patient_id} - ${JSON.stringify(patient.data)}`
        );
      } catch (error) {
        Logger.error(`clinic id: ${patient_id} - ${error}`);
        throw new AppError('patients service not available', 404, '03');
      }
    }

    const prescription = await this.prescriptionsRepository.create({
      clinic_id,
      patient_id,
      physician_id,
      text,
    });

    Logger.info(`prescription save: ${JSON.stringify(prescription)}`);

    try {
      const metrics = await createConnection.execute({
        timeout: 6000,
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
      Logger.info(`metrics save: ${JSON.stringify(metrics.data)}`);
    } catch (error) {
      await this.prescriptionsRepository.destroy(prescription.id);
      Logger.error(`metrics service not available: ${error}`);
      throw new AppError('metrics service not available', 404, '04');
    }

    return {
      data: {
        id: prescription.id,
        clinic: {
          id: clinic_id,
        },
        physician: {
          id: physician_id,
        },
        patient: {
          id: patient_id,
        },
        text,
      },
    };
  }
}

export { CreatePrescriptionsUseCase };
