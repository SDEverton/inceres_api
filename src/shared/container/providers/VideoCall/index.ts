import { container } from 'tsyringe';

import { AgoraProvider } from './implementations/AgoraProvider';
import { IVideoCallProvider } from './models/IVideoCallProvider';

container.registerSingleton<IVideoCallProvider>('AgoraProvider', AgoraProvider);
