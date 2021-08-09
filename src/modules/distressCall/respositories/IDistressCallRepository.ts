import { ICreateDistessCallDTO } from '../dtos/ICreateDistessCallDTO';
import { DistressCall } from '../infra/typeorm/entities/DistressCall';

interface IDistressCallRepository {
  create(data: ICreateDistessCallDTO): Promise<DistressCall>;
  finish(id: string): Promise<void>;
}

export { IDistressCallRepository };
