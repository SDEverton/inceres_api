import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<User[]> {
    return this.usersRepository.findAll();
  }
}

export { ListUsersUseCase };
