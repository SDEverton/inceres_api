import { classToClass } from 'class-transformer';

import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { User } from '../infra/typeorm/entities/User';

class UserMap {
  static toDTO({
    email,
    name,
    id,
    document,
    cell_phone,
  }: User): IUserResponseDTO {
    const user = classToClass({
      email,
      name,
      id,
      document,
      cell_phone,
    });
    return user;
  }
}

export { UserMap };
