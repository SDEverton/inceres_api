import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      user: { id },
    } = request;

    request.body.id = id;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute(request.body);

    return response.status(204).send();
  }
}

export { UpdateUserController };
