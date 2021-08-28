import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { User } from '../entities/User';

class UserRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
    });

    await this.repository.save(user);

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });

    return user;
  }

  async update(data: ICreateUserDTO): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id')
      .setParameters({ id: data.id })
      .execute();
  }
}

export { UserRepository };
