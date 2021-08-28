import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateNoteUseCase } from './UpdateNoteUseCase';

class UpdateNoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const file = request.file.filename;
    const { id } = request.params;

    const updateNoteUseCase = container.resolve(UpdateNoteUseCase);

    request.body.file = file;
    request.body.id = id;
    const data = await updateNoteUseCase.execute(request.body);

    return response.status(200).json(data);
  }
}

export { UpdateNoteController };
