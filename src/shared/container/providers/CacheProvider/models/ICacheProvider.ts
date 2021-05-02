interface ICacheProvider {
  save(key: string, value: string, time: number): Promise<void>;
  recover(key: string): Promise<any>;
  invalidate(key: string): Promise<void>;
}

export { ICacheProvider };
