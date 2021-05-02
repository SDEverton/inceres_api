import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

import { ICacheProvider } from '../models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  async save(key: string, value: string, time: number): Promise<void> {
    const timeSeconds = 60 * 60 * time;
    await this.client.set(key, value, 'EX', timeSeconds);
  }
  async recover(key: string): Promise<any> {
    const data = await this.client.get(key);

    return JSON.parse(data);
  }
  async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}

export { RedisCacheProvider };
