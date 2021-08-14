import { container } from 'tsyringe';

import { LocalStorageProvider } from './implementations/LocalstorageProvider';
import { IStorageProvider } from './IStrorageProvider';

const diskStorage = {
  local: LocalStorageProvider,
  s3: '',
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.disk]
);
