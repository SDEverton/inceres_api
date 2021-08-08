import { inject, injectable } from 'tsyringe';

import { ICreateDistessCallDTO } from '@modules/distressCall/dtos/ICreateDistessCallDTO';
import { IDistressCallRepository } from '@modules/distressCall/respositories/IDistressCallRepository';

@injectable()
class CreateDistressCallUseCase {
  constructor(
    @inject('DistressCallRespository')
    private distressCallRespository: IDistressCallRepository
  ) {}

  async execute({ lat, lng, user_id }: ICreateDistessCallDTO): Promise<void> {
    await this.distressCallRespository.create({
      lat,
      lng,
      user_id,
    });
  }
}

export { CreateDistressCallUseCase };
