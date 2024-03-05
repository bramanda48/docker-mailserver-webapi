export class Alias {
  private email: string;

  constructor($email: string) {
    this.email = $email;
  }

  /**
   * Getter $email
   * @return {string}
   */
  public get $email(): string {
    return this.email;
  }
}
