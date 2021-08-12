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
    activid,
    token_channel,
  }: ICreateDistessCallDTO): Promise<DistressCall> {
    const distressCall = this.repository.create({
      lat,
      lng,
      user_id,
      activid,
      token_channel,
    });

    await this.repository.save(distressCall);

    return distressCall;
  }

  async listAll(
    activid: boolean,
    take: number,
    page: number
  ): Promise<DistressCall[]> {
    return this.repository.find({
      where: { activid },
      relations: ['user'],
      take,
      skip: take * (page - 1),
    });
  }

  async listById(id: string): Promise<DistressCall> {
    return this.repository.findOne({
      where: { id },
      relations: ['locationHistory'],
    });
  }

  async finish(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ activid: false })
      .where('id = :id')
      .setParameters({ id })
      .execute();
  }
}

export { DistressCallRespository };
