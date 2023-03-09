export abstract class AbstractRedisClient {
  private tokenExpiryTime = 604800;
  protected client;

  protected constructor(client: any) {
    this.client = client;
  }

  public async getOne<T>(key: string): Promise<T> {
    return await this.client.get(key);
  }

  public getAllKeys(wildcard: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.client.keys(wildcard,
        async (error: Error, results: string[]) => {
          if (error) {
            return reject(error);
          }
          else {
            return resolve(results);
          }
        });
    });
  }

  public async getAllKeyValue(wildcard: string): Promise<any[]> {
    const result = await this.client.keys(wildcard);
    return await Promise.all(result.map(async (key: string) => {
      const value = await this.getOne(key);
      return { key, value };
    }));
  }

  public async set(key: string, value: any): Promise<any> {
    try {
      await this.client.set(key, value);
    }
    catch (err) {
      await this.client.expire(key, this.tokenExpiryTime);
    }
  }

  public deleteOne(key: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.client.del(key,
        (error: any, reply: any) => {
          if (error) {
            return reject(error);
          }
          else {
            return resolve(reply);
          }
        });
    });
  }

  public testConnection(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.set('test', 'connected',
        (err: any) => {
          if (err) {
            reject();
          }
          else {
            resolve(true);
          }
        });
    });
  }
}

