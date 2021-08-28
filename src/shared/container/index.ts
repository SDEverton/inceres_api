import { container } from 'tsyringe';

import '@shared/container/providers';
import { NotesRepository } from '@modules/notes/infra/typeorm/repositories/NotesRepository';
import { INotesRepository } from '@modules/notes/repositories/INotesRepository';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);

container.registerSingleton<INotesRepository>(
  'NotesRepository',
  NotesRepository
);
