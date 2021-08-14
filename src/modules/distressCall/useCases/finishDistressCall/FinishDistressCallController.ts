import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FinishDistressCallUseCase } from './FinishDistressCallUseCase';

class FinishDistressCallController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { user } = request;

    const distressCall = container.resolve(FinishDistressCallUseCase);

    await distressCall.execute(id, user.id);

    return response.status(204).json();
  }
}

export { FinishDistressCallController };
