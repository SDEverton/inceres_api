import { getRepository, Repository } from 'typeorm';

import { ICreateLocationHistoryDTO } from '@modules/distressCall/dtos/ICreateLocationHistoryDTO';
import { ILocationRepository } from '@modules/distressCall/respositories/ILocationHistoryRespository';

import { LocationHistory } from '../entities/LocationHistory';

class LocationHistoryRepository implements ILocationRepository {
  private repository: Repository<LocationHistory>;

  constructor() {
    this.repository = getRepository(LocationHistory);
  }

  async create({
    lat,
    lng,
    distress_call_id,
  }: ICreateLocationHistoryDTO): Promise<LocationHistory> {
    const locationHistory = this.repository.create({
      lat,
      lng,
      distress_call_id,
    });

    await this.repository.save(locationHistory);

    return locationHistory;
  }
}

export { LocationHistoryRepository };
