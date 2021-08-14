import { inject, injectable } from 'tsyringe';

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
  async execute({ user_id, avatar_file }: IResquest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    console.log({ user_id, avatar_file });
    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar');
    }

    await this.storageProvider.save(avatar_file, 'avatar');

    user.avatar = avatar_file;

    await this.usersRepository.update(user);
  }
}

export { UpdateUserAvatarUseCase };
