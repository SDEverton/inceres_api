import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
import * as OneSignal from 'onesignal-node';
import { inject, injectable } from 'tsyringe';

import { ICreateDistessCallDTO } from '@modules/distressCall/dtos/ICreateDistessCallDTO';
import { IDistressCallRepository } from '@modules/distressCall/respositories/IDistressCallRepository';
import { ILocationRepository } from '@modules/distressCall/respositories/ILocationHistoryRespository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateDistressCallUseCase {
  constructor(
    @inject('DistressCallRespository')
    private distressCallRespository: IDistressCallRepository,
    @inject('LocationHistoryRepository')
    private locationHistoryRepository: ILocationRepository,
    @inject('UserRepository')
    private userRepository: IUsersRepository
  ) {}

  async execute({ lat, lng, user_id }: ICreateDistessCallDTO): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    const appID = process.env.APP_ID_AGORA;
    const appCertificate = process.env.CERTIFICATE_AGORA;
    const channelName = user.document;
    const uid = Number(user.document);

    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600;

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token_channel = RtcTokenBuilder.buildTokenWithUid(
      appID,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs
    );

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

    const client = new OneSignal.Client(
      process.env.APP_ID,
      process.env.APP_KEY
    );

    const notification = {
      headings: {
        en: 'PEDIDO DE SOCORRO',
      },
      contents: {
        en: `${user.name} - ${user.document} 
        `,
      },
      large_icon:
        'https://sigpol.pm.pa.gov.br/upload/pessoa/1/8/5/9/6/foto.jpg',
      included_segments: ['Subscribed Users'],
      android_led_color: 'FFFF3805',
      android_accent_color: 'FFFF3805',
    };

    try {
      await client.createNotification(notification);
    } catch (e) {
      if (e instanceof OneSignal.HTTPError) {
        console.log(e.statusCode);
        console.log(e.body);
        throw new AppError('Sorry, push notification not send', e.statusCode);
      }
    }
  }
}

export { CreateDistressCallUseCase };
