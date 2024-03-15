export class DovecotMaster {
  private email: string;
  private password: string;

  constructor($email: string, $password?: string) {
    this.email = $email;
    this.password = $password;
  }

  /**
   * Getter $email
   * @return {string}
   */
  public get $email(): string {
    return this.email;
  }

  /**
   * Getter $password
   * @return {string}
   */
  public get $password(): string {
    return this.password;
  }
}
