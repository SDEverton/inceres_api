import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: UserRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    if (data.password) {
      const passwordHash = await hash(data.password, 8);
      Object.assign(data, { password: passwordHash });
    }

    await this.usersRepository.update(data);
  }
}

export { UpdateUserUseCase };
