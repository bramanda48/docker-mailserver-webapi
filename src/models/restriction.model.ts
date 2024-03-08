export enum RestrictionAccess {
  send = "send",
  receive = "receive",
}

export class Restriction {
  private send: boolean;
  private receive: boolean;

  constructor($send: boolean, $receive: boolean) {
    this.send = $send;
    this.receive = $receive;
  }

  /**
   * Getter $send
   * @return {boolean}
   */
  public get $send(): boolean {
    return this.send;
  }

  /**
   * Getter $receive
   * @return {boolean}
   */
  public get $receive(): boolean {
    return this.receive;
  }
}
