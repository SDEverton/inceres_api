import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListByIdDistressCallUseCase } from './ListByIdDistressCallUseCase';

class ListByIdDistressCallController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { _id } = request.params;

    const listByIdDistressCall = container.resolve(ListByIdDistressCallUseCase);

    const data = await listByIdDistressCall.execute(_id);

    return response.status(200).json(data);
  }
}

export { ListByIdDistressCallController };
