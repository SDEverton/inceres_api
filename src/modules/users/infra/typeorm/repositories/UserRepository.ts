import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { User } from '../entities/User';

class UserRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    password,
    phone,
    cell_phone,
    document,
    birth_date,
    email,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      phone,
      cell_phone,
      document,
      birth_date,
      email,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  async findByDocument(document: string): Promise<User> {
    const user = await this.repository.findOne({ where: { document } });

    console.log(user);
    return user;
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
