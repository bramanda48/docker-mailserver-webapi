export class Alias {
  private emailAlias: string;
  private emailRecipient: string[];

  constructor($emailAlias: string, $emailRecipient?: string[]) {
    this.emailAlias = $emailAlias;
    this.emailRecipient = $emailRecipient;
  }

  /**
   * Getter $emailAlias
   * @return {string}
   */
  public get $emailAlias(): string {
    return this.emailAlias;
  }

  /**
   * Getter $emailRecipient
   * @return {string[]}
   */
  public get $emailRecipient(): string[] {
    return this.emailRecipient;
  }
}
