import { container } from 'tsyringe';

import '@shared/container/providers';
import { DistressCallRespository } from '@modules/distressCall/infra/typeorm/respositories/DistressCallRespository';
import { IDistressCallRepository } from '@modules/distressCall/respositories/IDistressCallRepository';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);

container.registerSingleton<IDistressCallRepository>(
  'DistressCallRespository',
  DistressCallRespository
);
