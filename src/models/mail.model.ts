import { Alias } from "./alias.model.ts";
import { Restriction } from "./restriction.model.ts";
import { Quota } from "./quota.model.ts";

export class MailAccount {
  private email: string;
  private password: string;
  private alias: Alias[];
  private quota: Quota;
  private restriction: Restriction;

  constructor(
    $email: string,
    $password: string,
    $alias?: Alias[],
    $quota?: Quota,
    $restriction?: Restriction
  ) {
    this.email = $email;
    this.password = $password;
    this.alias = $alias;
    this.quota = $quota;
    this.restriction = $restriction;
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

  /**
   * Getter $restriction
   * @return {Restriction}
   */
  public get $restriction(): Restriction {
    return this.restriction;
  }
}
