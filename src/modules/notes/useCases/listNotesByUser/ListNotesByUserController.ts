import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListNotesByUserUseCase } from './ListNotesByUserUseCase';

class ListNotesByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listNotes = container.resolve(ListNotesByUserUseCase);

    const data = await listNotes.execute(user_id);

    return response.status(200).json(data);
  }
}

export { ListNotesByUserController };
