import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateNoteUseCase } from './CreateNoteUseCase';

class CreateNoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const file = request.file.filename;

    const createUserUseCase = container.resolve(CreateNoteUseCase);

    request.body.file = file;
    const data = await createUserUseCase.execute(request.body);

    return response.status(200).json(data);
  }
}

export { CreateNoteController };
