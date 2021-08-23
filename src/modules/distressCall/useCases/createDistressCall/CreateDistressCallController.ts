import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDistressCallUseCase } from './CreateDistressCallUseCase';

class CreateDistressCallController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { lat, lng } = request.body;
    const {
      user: { id },
    } = request;

    const createDistressCall = container.resolve(CreateDistressCallUseCase);

    const data = await createDistressCall.execute({
      lat,
      lng,
      user_id: id,
      activid: true,
    });

    return response.status(200).json(data);
  }
}

export { CreateDistressCallController };
