export class QuotaUsed {
  private quota_used: number;
  private quota_used_percent: number;

  constructor($quota_used: number, $quota_used_percent: number) {
    this.quota_used = $quota_used;
    this.quota_used_percent = $quota_used_percent;
  }

  /**
   * Getter $quota_used
   * @return {number}
   */
  public get $quota_used(): number {
    return this.quota_used;
  }

  /**
   * Getter $quota_used_percent
   * @return {number}
   */
  public get $quota_used_percent(): number {
    return this.quota_used_percent;
  }
}
