import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStrorageProvider';

interface IResquest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: UserRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}
  async execute({ user_id, avatar_file }: IResquest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    await this.storageProvider.save(avatar_file, 'avatar');

    return user;
  }
}

export { UpdateUserAvatarUseCase };
