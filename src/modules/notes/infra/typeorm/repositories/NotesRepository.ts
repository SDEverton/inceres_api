import { getRepository, Repository } from 'typeorm';

import { ICreateNotesDTO } from '@modules/notes/dtos/ICreateNotesDTO';
import { INotesRepository } from '@modules/notes/repositories/INotesRepository';

import { Notes } from '../entities/Notes';

class NotesRepository implements INotesRepository {
  private repository: Repository<Notes>;

  constructor() {
    this.repository = getRepository(Notes);
  }

  async create(data: ICreateNotesDTO): Promise<Notes> {
    const note = this.repository.create(data);

    await this.repository.save(note);

    return note;
  }

  async findByUser(user_id: string): Promise<Notes[]> {
    return this.repository.find({ where: { user_id } });
  }

  async findById(id: string): Promise<Notes> {
    return this.repository.findOne({ where: { id } });
  }

  async update({
    description,
    file,
    type_file,
    id,
  }: ICreateNotesDTO): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({
        description,
        file,
        type_file,
      })
      .where('id = :id')
      .setParameters({ id })
      .execute();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { NotesRepository };
