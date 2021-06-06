import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      phone,
      document,
      birth_date,
      cell_phone,
    } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      phone,
      document,
      birth_date,
      cell_phone,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
