export class RelayExclude {
  private domain: string;

  constructor($domain: string) {
    this.domain = $domain;
  }

  /**
   * Getter $domain
   * @return {string}
   */
  public get $domain(): string {
    return this.domain;
  }
}
