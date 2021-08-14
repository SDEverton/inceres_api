import { inject, injectable } from 'tsyringe';

import { IDistressCallRepository } from '@modules/distressCall/respositories/IDistressCallRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IPushNotificationProvider } from '@shared/container/providers/PushNotification/models/IPushNotificationProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FinishDistressCallUseCase {
  constructor(
    @inject('DistressCallRespository')
    private distressCallRespository: IDistressCallRepository,
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('OnseSignalProvider')
    private onseSignalProvider: IPushNotificationProvider
  ) {}

  async execute(id: string, user_id: string): Promise<void> {
    const distressCall = await this.distressCallRespository.listById(id);

    if (distressCall.user_id === user_id) {
      const user = await this.userRepository.findById(user_id);

      await this.onseSignalProvider.send({
        title: 'Pedido de Socorro Finalizado',
        document: user.document,
        name: user.name,
        color: '0E278C',
      });

      await this.distressCallRespository.finish(id);
    } else {
      throw new AppError('Unauthorized user', 404);
    }
  }
}

export { FinishDistressCallUseCase };
