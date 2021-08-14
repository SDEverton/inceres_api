import * as OneSignal from 'onesignal-node';

import { AppError } from '@shared/errors/AppError';

import { IPushNotificationProvider } from '../models/IPushNotificationProvider';

interface ISend {
  title: string;
  name: string;
  document: string;
  color: string;
}

class OnseSignalProvider implements IPushNotificationProvider {
  private client: any;

  constructor() {
    this.client = new OneSignal.Client(process.env.APP_ID, process.env.APP_KEY);
  }

  async send({ title, name, document, color }: ISend): Promise<void> {
    const notification = {
      headings: {
        en: title,
      },
      contents: {
        en: `${name} - ${document} 
        `,
      },
      large_icon:
        'https://sigpol.pm.pa.gov.br/upload/pessoa/1/8/5/9/6/foto.jpg',
      included_segments: ['Subscribed Users'],
      android_led_color: color,
      android_accent_color: color,
    };

    try {
      await this.client.createNotification(notification);
    } catch (e) {
      if (e instanceof OneSignal.HTTPError) {
        console.log(e.statusCode);
        console.log(e.body);
        throw new AppError('Sorry, push notification not send', e.statusCode);
      }
    }
  }
}

export { OnseSignalProvider };
