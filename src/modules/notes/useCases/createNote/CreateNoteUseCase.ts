import { inject, injectable } from 'tsyringe';

import { ICreateNotesDTO } from '@modules/notes/dtos/ICreateNotesDTO';
import { Notes } from '@modules/notes/infra/typeorm/entities/Notes';
import { INotesRepository } from '@modules/notes/repositories/INotesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStrorageProvider';

@injectable()
class CreateNoteUseCase {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute(data: ICreateNotesDTO): Promise<Notes> {
    const note = await this.notesRepository.create(data);
    await this.storageProvider.save(data.file, 'file');

    return note;
  }
}

export { CreateNoteUseCase };
