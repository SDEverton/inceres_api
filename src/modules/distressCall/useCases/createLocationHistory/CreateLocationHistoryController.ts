import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateLocationHistoryUseCase } from './CreateLocationHistoryUseCase';

class CreateLocationHistoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { lat, lng } = request.body;
    const { distress_call_id } = request.params;

    const createDistressCall = container.resolve(CreateLocationHistoryUseCase);

    await createDistressCall.execute({ lat, lng, distress_call_id });

    return response.status(201).json();
  }
}

export { CreateLocationHistoryController };
