export class DKIM {
  private keytype: string;
  private keysize: string;
  private selector: string;
  private domain: string;
  private adapter: string;

  constructor(
    $keytype: string,
    $keysize: string,
    $selector: string,
    $domain: string,
    $adapter: string
  ) {
    this.keytype = $keytype;
    this.keysize = $keysize;
    this.selector = $selector;
    this.domain = $domain;
    this.adapter = $adapter;
  }

  /**
   * Getter $keytype
   * @return {string}
   */
  public get $keytype(): string {
    return this.keytype;
  }

  /**
   * Getter $keysize
   * @return {string}
   */
  public get $keysize(): string {
    return this.keysize;
  }

  /**
   * Getter $selector
   * @return {string}
   */
  public get $selector(): string {
    return this.selector;
  }

  /**
   * Getter $domain
   * @return {string}
   */
  public get $domain(): string {
    return this.domain;
  }

  /**
   * Getter $adapter
   * @return {string}
   */
  public get $adapter(): string {
    return this.adapter;
  }
}
