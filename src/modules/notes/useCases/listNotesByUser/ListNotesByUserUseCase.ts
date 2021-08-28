import { inject, injectable } from 'tsyringe';

import { ICreateNotesDTO } from '@modules/notes/dtos/ICreateNotesDTO';
import { NotesMap } from '@modules/notes/mapper/NotesMap';
import { INotesRepository } from '@modules/notes/repositories/INotesRepository';

@injectable()
class ListNotesByUserUseCase {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository
  ) {}

  async execute(user_id: string): Promise<ICreateNotesDTO[]> {
    const note = await this.notesRepository.findByUser(user_id);

    const notes = note.map((item) => NotesMap.toDTO(item));

    return notes;
  }
}

export { ListNotesByUserUseCase };
