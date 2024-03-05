import { Alias } from "./alias.model.ts";
import { Quota } from "./quota.model.ts";

export class MailAccount {
  private email: string;
  private password: string;
  private alias: Alias[];
  private quota: Quota;

  constructor(
    $email: string,
    $password: string,
    $alias?: Alias[],
    $quota?: Quota
  ) {
    this.email = $email;
    this.password = $password;
    this.alias = $alias;
    this.quota = $quota;
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

  /**
   * Getter $alias
   * @return {Alias[]}
   */
  public get $alias(): Alias[] {
    return this.alias;
  }

  /**
   * Getter $quota
   * @return {Quota}
   */
  public get $quota(): Quota {
    return this.quota;
  }
}
