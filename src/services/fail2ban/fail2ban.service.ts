import { InternalServerErrorException } from "../../exceptions/internal-server.exception.ts";
import { Fail2banJail } from "../../models/fail2ban-jail.model.ts";
import { BaseService } from "../base.service.ts";

export class Fail2banService extends BaseService {
  public getJail(name?: string): Fail2banJail[] {
    const queryWhere = name ? "WHERE jail = ?" : "";
    const querySelectJail = `
      SELECT 
        jail as name, 
        SUM(CASE WHEN (timeofban + bantime) > CAST(STRFTIME('%s', 'now') as INTEGER) THEN 1 ELSE 0 END) as 'currentlyBanned',
        COUNT(0) as 'totalBanned',
        GROUP_CONCAT(ip, ',') as 'bannedIps'
      FROM bips ${queryWhere} GROUP BY jail;
    `;
    return this.dbFail2ban
      .prepare(querySelectJail)
      .all(name)
      .map(
        ({ name, currentlyBanned, totalBanned, bannedIps }) =>
          new Fail2banJail(
            name,
            currentlyBanned,
            totalBanned,
            bannedIps.split(",")
          )
      );
  }

  public banIpAddress(ipAddress: string): Fail2banJail {
    if (this.dbFail2ban.open) this.dbFail2ban.close();

    const cmd = new Deno.Command("scripts/fail2ban-banned-ip.sh", {
      args: [ipAddress],
    });
    const { success } = cmd.outputSync();
    if (!success) {
      throw new InternalServerErrorException(`Failed to ban ip: ${ipAddress}`);
    }
    return this.getJail("custom")[0];
  }

  public unbanIpAddress(ipAddress: string): Fail2banJail {
    if (this.dbFail2ban.open) this.dbFail2ban.close();

    const cmd = new Deno.Command("scripts/fail2ban-unbanned-ip.sh", {
      args: [ipAddress],
    });
    const { success } = cmd.outputSync();
    if (!success) {
      throw new InternalServerErrorException(
        `Failed to unban ip: ${ipAddress}`
      );
    }
    return this.getJail("custom")[0];
  }
}
