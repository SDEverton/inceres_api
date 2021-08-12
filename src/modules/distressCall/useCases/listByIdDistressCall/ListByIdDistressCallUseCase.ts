import { inject, injectable } from 'tsyringe';

import { DistressCall } from '@modules/distressCall/infra/typeorm/entities/DistressCall';
import { IDistressCallRepository } from '@modules/distressCall/respositories/IDistressCallRepository';

@injectable()
class ListByIdDistressCallUseCase {
  constructor(
    @inject('DistressCallRespository')
    private distressCallRespository: IDistressCallRepository
  ) {}

  async execute(id: string): Promise<DistressCall> {
    return this.distressCallRespository.listById(id);
  }
}

export { ListByIdDistressCallUseCase };
