import { inject, injectable } from 'tsyringe';

import { ICreateNotesDTO } from '@modules/notes/dtos/ICreateNotesDTO';
import { Notes } from '@modules/notes/infra/typeorm/entities/Notes';
import { INotesRepository } from '@modules/notes/repositories/INotesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStrorageProvider';

@injectable()
class UpdateNoteUseCase {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute(data: ICreateNotesDTO): Promise<Notes> {
    const note = await this.notesRepository.findById(data.id);

    if (note.file) {
      await this.storageProvider.delete(note.file, 'file');
    }

    await this.storageProvider.save(data.file, 'file');

    await this.notesRepository.update(data);
    const noteUpdated = await this.notesRepository.findById(data.id);

    return noteUpdated;
  }
}

export { UpdateNoteUseCase };
