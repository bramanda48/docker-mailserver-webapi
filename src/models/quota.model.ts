import { QuotaUsed } from "./quota-used.model.ts";

export class Quota extends QuotaUsed {
  private quota: number;

  constructor(
    $quota: number,
    $quota_used: number,
    $quota_used_percent: number
  ) {
    super($quota_used, $quota_used_percent);
    this.quota = $quota;
  }

  /**
   * Getter $quota
   * @return {number}
   */
  public get $quota(): number {
    return this.quota;
  }

  /**
   * Setter $quota
   * @param {number} value
   */
  public set $quota(value: number) {
    this.quota = value;
  }
}
