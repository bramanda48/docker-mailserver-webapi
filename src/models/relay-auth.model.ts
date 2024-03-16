export class RelayAuth {
  private domain: string;
  private username: string;
  private password: string;

  constructor($domain: string, $username: string, $password: string) {
    this.domain = $domain;
    this.username = $username;
    this.password = $password;
  }

  /**
   * Getter $domain
   * @return {string}
   */
  public get $domain(): string {
    return this.domain;
  }

  /**
   * Getter $username
   * @return {string}
   */
  public get $username(): string {
    return this.username;
  }

  /**
   * Getter $password
   * @return {string}
   */
  public get $password(): string {
    return this.password;
  }
}
