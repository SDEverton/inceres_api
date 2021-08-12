import { ICreateDistessCallDTO } from '../dtos/ICreateDistessCallDTO';
import { DistressCall } from '../infra/typeorm/entities/DistressCall';

interface IDistressCallRepository {
  create(data: ICreateDistessCallDTO): Promise<DistressCall>;
  listAll(
    activid: boolean,
    take: number,
    page: number
  ): Promise<DistressCall[]>;
  listById(id: string): Promise<DistressCall>;
  finish(id: string): Promise<void>;
}

export { IDistressCallRepository };
