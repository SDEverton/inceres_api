import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SearchUserExistUseCase } from './SearchUserExistUseCase';

class SearchUserExistController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { document } = request.params;

    const searchUserExistUseCase = container.resolve(SearchUserExistUseCase);

    const data = await searchUserExistUseCase.execute(document);

    return response.status(200).json(data);
  }
}

export { SearchUserExistController };
