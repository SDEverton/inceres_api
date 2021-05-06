import { ICreatePrescriptionsDTO } from '@modules/prescriptions/dtos/ICreatePrescriptionsDTO';
import { Prescriptions } from '@modules/prescriptions/infra/typeorm/entities/Prescriptions';

import { IPrescriptionsRepository } from '../IPrescriptionsRepository';

class PrescriptionRepositoryInMemory implements IPrescriptionsRepository {
  prescriptions: Prescriptions[] = [];

  async create({
    clinic_id,
    patient_id,
    physician_id,
    text,
  }: ICreatePrescriptionsDTO): Promise<Prescriptions> {
    const prescription = new Prescriptions();

    Object.assign(prescription, {
      clinic_id,
      patient_id,
      physician_id,
      text,
    });

    this.prescriptions.push(prescription);

    return prescription;
  }
  async destroy(id: string): Promise<void> {
    const prescription = this.prescriptions.find((ut) => ut.id === id);
    this.prescriptions.splice(this.prescriptions.indexOf(prescription));
  }
}

export { PrescriptionRepositoryInMemory };
