import axios from 'axios';

const BaseUrl = axios.create({
  baseURL: 'https://5f71da6964a3720016e60ff8.mockapi.io/v1',
});

export { BaseUrl };
