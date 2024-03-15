export class DovecotMaster {
  private username: string;
  private password: string;

  constructor($username: string, $password?: string) {
    this.username = $username;
    this.password = $password;
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
