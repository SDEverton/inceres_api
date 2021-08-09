import { inject, injectable } from 'tsyringe';

import { IDistressCallRepository } from '@modules/distressCall/respositories/IDistressCallRepository';

@injectable()
class FinishDistressCallUseCase {
  constructor(
    @inject('DistressCallRespository')
    private distressCallRespository: IDistressCallRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.distressCallRespository.finish(id);
  }
}

export { FinishDistressCallUseCase };
