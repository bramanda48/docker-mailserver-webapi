export class Fail2banJail {
  private name: string;
  private currentlyBanned: number;
  private totalBanned: number;
  private bannedIps: string[];

  constructor(
    $name: string,
    $currentlyBanned: number,
    $totalBanned: number,
    $bannedIps: string[]
  ) {
    this.name = $name;
    this.currentlyBanned = $currentlyBanned;
    this.totalBanned = $totalBanned;
    this.bannedIps = $bannedIps;
  }

  /**
   * Getter $name
   * @return {string}
   */
  public get $name(): string {
    return this.name;
  }

  /**
   * Getter $currentlyBanned
   * @return {number}
   */
  public get $currentlyBanned(): number {
    return this.currentlyBanned;
  }

  /**
   * Getter $totalBanned
   * @return {number}
   */
  public get $totalBanned(): number {
    return this.totalBanned;
  }

  /**
   * Getter $bannedIps
   * @return {string[]}
   */
  public get $bannedIps(): string[] {
    return this.bannedIps;
  }
}
