import { classToClass } from 'class-transformer';

import { ICreateNotesDTO } from '../dtos/ICreateNotesDTO';
import { Notes } from '../infra/typeorm/entities/Notes';

class NotesMap {
  static toDTO({
    id,
    file,
    description,
    type_file,
    created_at,
    user_id,
    file_url,
  }: Notes): ICreateNotesDTO {
    const notes = classToClass({
      id,
      file,
      description,
      type_file,
      created_at,
      user_id,
      file_url,
    });
    return notes;
  }
}

export { NotesMap };
