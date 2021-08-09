import { inject, injectable } from 'tsyringe';

import { ICreateLocationHistoryDTO } from '@modules/distressCall/dtos/ICreateLocationHistoryDTO';
import { ILocationRepository } from '@modules/distressCall/respositories/ILocationHistoryRespository';

@injectable()
class CreateLocationHistoryUseCase {
  constructor(
    @inject('LocationHistoryRepository')
    private locationHistoryRepository: ILocationRepository
  ) {}

  async execute({
    lat,
    lng,
    distress_call_id,
  }: ICreateLocationHistoryDTO): Promise<void> {
    await this.locationHistoryRepository.create({
      lat,
      lng,
      distress_call_id,
    });
  }
}

export { CreateLocationHistoryUseCase };
