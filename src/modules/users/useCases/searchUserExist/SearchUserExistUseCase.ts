import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class SearchUserExistUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(document: string): Promise<string> {
    const user = await this.usersRepository.findByDocument(document);

    if (user && user.email === null) {
      return 'User enabled for registration';
    }

    throw new AppError('User not enabled for registration', 404);
  }
}

export { SearchUserExistUseCase };
