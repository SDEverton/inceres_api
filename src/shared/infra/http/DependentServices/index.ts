import { Method, AxiosResponse } from 'axios';

import { BaseUrl } from './BaseUrls';

interface IRequest {
  method: Method;
  timeout: number;
  token: string;
  url: string;
  data?: any;
  retry?: number;
}

class DependentServices {
  async execute({
    method,
    timeout,
    token,
    url,
    data,
    retry = 1,
  }: IRequest): Promise<AxiosResponse> {
    for (let i = 0; i < retry; i++) {
      try {
        const response = await BaseUrl({
          method,
          timeout,
          headers: {
            Authorization: token,
          },
          url,
          data,
        });

        if (response) {
          return response;
        }
      } catch (error) {
        throw new Error(error);
      }
    }

    return null;
  }
}

export { DependentServices };
