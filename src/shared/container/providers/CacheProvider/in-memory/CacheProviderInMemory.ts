import { Cache } from '../models/Cache';
import { ICacheProvider } from '../models/ICacheProvider';

class CacheProviderInMemory implements ICacheProvider {
  client: Cache[] = [];

  async save(key: string, value: string, time: number): Promise<void> {
    const client = new Cache();

    const timeSeconds = 60 * 60 * time;

    Object.assign(client, {
      key,
      value,
      time: timeSeconds,
    });

    this.client.push(client);
  }
  async recover(key: string): Promise<any> {
    return this.client.find((cli) => cli.key === key);
  }
  async invalidate(key: string): Promise<void> {
    const client = this.client.find((ut) => ut.key === key);
    this.client.splice(this.client.indexOf(client));
  }
}

export { CacheProviderInMemory };
