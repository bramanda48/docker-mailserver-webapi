import { utils } from "../../utils/utils.ts";
import { BaseService } from "../base.service.ts";

export class Fail2banLogs extends BaseService {
  public getLogs(limit: number): string {
    try {
      const cmd = new Deno.Command("scripts/logs.sh", {
        args: ["fail2ban", limit.toString()],
      });
      const { success, stdout } = cmd.outputSync();

      if (!success) return null;
      else return utils.textDecode(stdout);
    } catch {
      return null;
    }
  }
}
