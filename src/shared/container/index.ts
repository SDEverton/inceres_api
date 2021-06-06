import { container } from 'tsyringe';

import '@shared/container/providers';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);
