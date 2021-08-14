import { RtcTokenBuilder, RtcRole } from 'agora-access-token';

import { IVideoCallProvider } from '../models/IVideoCallProvider';

class AgoraProvider implements IVideoCallProvider {
  async createToken(document: string): Promise<string> {
    const appID = process.env.APP_ID_AGORA;
    const appCertificate = process.env.CERTIFICATE_AGORA;

    const channelName = document;
    const uid = Number(document);

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

    return token_channel;
  }
}

export { AgoraProvider };
