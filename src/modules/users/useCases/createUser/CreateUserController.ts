import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const data = await createUserUseCase.execute({
      name,
    });

    return response.status(200).json(data);
  }
}

export { CreateUserController };
