import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({
    name,
    email,
    password,
    phone,
    document,
    birth_date,
    cell_phone,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadExists = await this.usersRepository.findByDocument(
      document
    );

    if (userAlreadExists && userAlreadExists.email !== null) {
      throw new AppError('User already exists!', 404);
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.update({
      id: userAlreadExists.id,
      name,
      email,
      password: passwordHash,
      phone,
      document,
      birth_date,
      cell_phone,
    });
  }
}

export { CreateUserUseCase };
