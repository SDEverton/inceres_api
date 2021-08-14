import { hash } from 'bcryptjs';
import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs'
    );

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const password = String(Math.floor(Math.random() * 65536));
    const passwordHash = await hash(password, 8);
    user.password = passwordHash;

    await this.userRepository.update(user);

    const variables = {
      name: user.name,
      password,
    };

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath
    );
  }
}

export { SendForgotPasswordMailUseCase };
