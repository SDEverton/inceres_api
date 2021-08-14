import { container } from 'tsyringe';

import { OnseSignalProvider } from './implementations/OneSignalProvider';
import { IPushNotificationProvider } from './models/IPushNotificationProvider';

container.registerSingleton<IPushNotificationProvider>(
  'OnseSignalProvider',
  OnseSignalProvider
);
