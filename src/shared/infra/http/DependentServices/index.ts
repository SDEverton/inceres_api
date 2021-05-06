import { Method, AxiosResponse } from 'axios';

import { BaseUrl } from './BaseUrls';

interface IRequest {
  method: Method;
  timeout: number;
  token: string;
  url: string;
  data?: any;
  retry?: number;
  error?: boolean;
}

class DependentServices {
  async execute({
    method,
    timeout,
    token,
    url,
    data,
    retry = 1,
    error = true,
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
      } catch (errors) {
        if (error) {
          throw new Error(errors);
        }

        return errors;
      }
    }

    return null;
  }
}

export { DependentServices };
