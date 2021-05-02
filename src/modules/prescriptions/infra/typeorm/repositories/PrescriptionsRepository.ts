import { getRepository, Repository } from 'typeorm';

import { ICreatePrescriptionsDTO } from '@modules/prescriptions/dtos/ICreatePrescriptionsDTO';
import { IPrescriptionsRepository } from '@modules/prescriptions/repositories/IPrescriptionsRepository';

import { Prescriptions } from '../entities/Prescriptions';

class PrescriptionsRepository implements IPrescriptionsRepository {
  private repository: Repository<Prescriptions>;

  constructor() {
    this.repository = getRepository(Prescriptions);
  }
  async create({
    clinic_id,
    patient_id,
    physician_id,
    text,
  }: ICreatePrescriptionsDTO): Promise<Prescriptions> {
    const prescription = this.repository.create({
      clinic_id,
      patient_id,
      physician_id,
      text,
    });

    return this.repository.save(prescription);
  }

  async destroy(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { PrescriptionsRepository };
