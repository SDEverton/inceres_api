import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDistressCallUseCase } from './CreateDistressCallUseCase';

class CreateDistressCallController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { lat, lng, user_id } = request.body;

    const createDistressCall = container.resolve(CreateDistressCallUseCase);

    await createDistressCall.execute({ lat, lng, user_id });

    return response.status(201).json();
  }
}

export { CreateDistressCallController };
