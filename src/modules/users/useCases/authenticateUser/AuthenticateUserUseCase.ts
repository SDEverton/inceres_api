import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { UserMap } from '@modules/users/mapper/UserMap';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  document: string;
  password: string;
}

interface IResponse {
  user: UserMap;
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository
  ) {}

  async execute({ document, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByDocument(document);
    const { secret_token, exprires_in_token } = auth;

    if (!user) {
      throw new AppError('Document or password incorrect!');
    }

    const passwordMath = await compare(password, user.password);

    if (!passwordMath) {
      throw new AppError('Document or password incorrect!');
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: exprires_in_token,
    });

    const tokenReturn: IResponse = {
      token,
      user: UserMap.toDTO(user),
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
