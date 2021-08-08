import { getRepository, Repository } from 'typeorm';

import { ICreateDistessCallDTO } from '@modules/distressCall/dtos/ICreateDistessCallDTO';
import { IDistressCallRepository } from '@modules/distressCall/respositories/IDistressCallRepository';

import { DistressCall } from '../entities/DistressCall';

class DistressCallRespository implements IDistressCallRepository {
  private repository: Repository<DistressCall>;

  constructor() {
    this.repository = getRepository(DistressCall);
  }

  async create({
    lat,
    lng,
    user_id,
  }: ICreateDistessCallDTO): Promise<DistressCall> {
    const distressCall = this.repository.create({
      lat,
      lng,
      user_id,
    });

    await this.repository.save(distressCall);

    return distressCall;
  }
}

export { DistressCallRespository };
