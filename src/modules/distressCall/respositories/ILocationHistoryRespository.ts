import { ICreateLocationHistoryDTO } from '../dtos/ICreateLocationHistoryDTO';
import { LocationHistory } from '../infra/typeorm/entities/LocationHistory';

interface ILocationRepository {
  create(data: ICreateLocationHistoryDTO): Promise<LocationHistory>;
}

export { ILocationRepository };
