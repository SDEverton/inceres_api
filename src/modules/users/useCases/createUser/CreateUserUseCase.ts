import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({ name }: ICreateUserDTO): Promise<User> {
    const user = await this.usersRepository.create({
      name,
    });

    return user;
  }
}

export { CreateUserUseCase };
