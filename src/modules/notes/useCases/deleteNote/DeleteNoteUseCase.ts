import { inject, injectable } from 'tsyringe';

import { INotesRepository } from '@modules/notes/repositories/INotesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStrorageProvider';

@injectable()
class DeleteNoteUseCase {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute(id: string): Promise<void> {
    const note = await this.notesRepository.findById(id);
    await this.notesRepository.delete(id);
    await this.storageProvider.delete(note.file, 'file');
  }
}

export { DeleteNoteUseCase };
