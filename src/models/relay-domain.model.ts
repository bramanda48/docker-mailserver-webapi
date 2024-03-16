export class RelayDomain {
  private domain: string;
  private host: string;
  private port: number;

  constructor($domain: string, $host: string, $port: number) {
    this.domain = $domain;
    this.host = $host;
    this.port = $port;
  }

  /**
   * Getter $domain
   * @return {string}
   */
  public get $domain(): string {
    return this.domain;
  }

  /**
   * Getter $host
   * @return {string}
   */
  public get $host(): string {
    return this.host;
  }

  /**
   * Getter $port
   * @return {number}
   */
  public get $port(): number {
    return this.port;
  }
}
