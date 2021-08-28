import { ICreateNotesDTO } from '../dtos/ICreateNotesDTO';
import { Notes } from '../infra/typeorm/entities/Notes';

interface INotesRepository {
  create(data: ICreateNotesDTO): Promise<Notes>;
  findById(id: string): Promise<Notes>;
  findByUser(user_id: string): Promise<Notes[]>;
  update(data: ICreateNotesDTO): Promise<void>;
  delete(id: string): Promise<void>;
}

export { INotesRepository };
