import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAllDistressCallUseCase } from './ListAllDistressCallUseCase';

class ListAllDistressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { activid, take, page } = request.body;

    const listAllDistressCall = container.resolve(ListAllDistressCallUseCase);

    const data = await listAllDistressCall.execute(activid, take, page);

    return response.status(200).json(data);
  }
}

export { ListAllDistressController };
