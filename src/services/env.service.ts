export class EnvService {
  public getAll(): {
    [key: string]: string;
  } {
    return Deno.env.toObject();
  }

  public get<T>(key: string): T {
    return Deno.env.get(key) as T;
  }

  public set(key: string, value: string): void {
    Deno.env.set(key, value);
  }

  public has(key: string): boolean {
    return Deno.env.has(key);
  }
}
