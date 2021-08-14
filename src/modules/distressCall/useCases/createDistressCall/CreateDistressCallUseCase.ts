import { inject, injectable } from 'tsyringe';

import { ICreateDistessCallDTO } from '@modules/distressCall/dtos/ICreateDistessCallDTO';
import { IDistressCallRepository } from '@modules/distressCall/respositories/IDistressCallRepository';
import { ILocationRepository } from '@modules/distressCall/respositories/ILocationHistoryRespository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IPushNotificationProvider } from '@shared/container/providers/PushNotification/models/IPushNotificationProvider';
import { IVideoCallProvider } from '@shared/container/providers/VideoCall/models/IVideoCallProvider';

@injectable()
class CreateDistressCallUseCase {
  constructor(
    @inject('DistressCallRespository')
    private distressCallRespository: IDistressCallRepository,
    @inject('LocationHistoryRepository')
    private locationHistoryRepository: ILocationRepository,
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('OnseSignalProvider')
    private onseSignalProvider: IPushNotificationProvider,
    @inject('AgoraProvider')
    private agoraProvider: IVideoCallProvider
  ) {}

  async execute({ lat, lng, user_id }: ICreateDistessCallDTO): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    const token_channel = await this.agoraProvider.createToken(user.document);

    const { id } = await this.distressCallRespository.create({
      lat,
      lng,
      user_id,
      activid: true,
      token_channel,
    });

    await this.locationHistoryRepository.create({
      lat,
      lng,
      distress_call_id: id,
    });

    await this.onseSignalProvider.send({
      title: 'Pedido de Socorro',
      document: user.document,
      name: user.name,
      color: 'AE1F29',
    });
  }
}

export { CreateDistressCallUseCase };
