export class QuotaUsed {
  private quotaUsed: number;
  private quotaUsedPercent: number;

  constructor($quotaUsed: number, $quotaUsedPercent: number) {
    this.quotaUsed = $quotaUsed;
    this.quotaUsedPercent = $quotaUsedPercent;
  }

  /**
   * Getter $quotaUsed
   * @return {number}
   */
  public get $quotaUsed(): number {
    return this.quotaUsed;
  }

  /**
   * Getter $quotaUsedPercent
   * @return {number}
   */
  public get $quotaUsedPercent(): number {
    return this.quotaUsedPercent;
  }
}
