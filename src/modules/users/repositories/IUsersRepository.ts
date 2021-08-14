import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findByDocument(document: string): Promise<User>;
  findById(id: string): Promise<User>;
  update(data: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
