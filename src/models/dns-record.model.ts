export class DnsRecord {
  private name: string;
  private type: string;
  private content: string;

  constructor($name: string, $type: string, $content: string) {
    this.name = $name;
    this.type = $type;
    this.content = $content;
  }

  /**
   * Getter $name
   * @return {string}
   */
  public get $name(): string {
    return this.name;
  }

  /**
   * Getter $type
   * @return {string}
   */
  public get $type(): string {
    return this.type;
  }

  /**
   * Getter $content
   * @return {string}
   */
  public get $content(): string {
    return this.content;
  }
}
