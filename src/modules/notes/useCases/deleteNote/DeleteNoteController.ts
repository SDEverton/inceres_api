import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteNoteUseCase } from './DeleteNoteUseCase';

class DeleteNoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteNote = container.resolve(DeleteNoteUseCase);

    await deleteNote.execute(id);

    return response.status(204).send();
  }
}

export { DeleteNoteController };
