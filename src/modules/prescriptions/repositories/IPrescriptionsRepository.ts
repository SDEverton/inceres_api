import { ICreatePrescriptionsDTO } from '../dtos/ICreatePrescriptionsDTO';
import { Prescriptions } from '../infra/typeorm/entities/Prescriptions';

interface IPrescriptionsRepository {
  create(data: ICreatePrescriptionsDTO): Promise<Prescriptions>;
  destroy(id: string): Promise<void>;
}

export { IPrescriptionsRepository };
