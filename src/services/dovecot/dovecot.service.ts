import { InternalServerErrorException } from "../../exceptions/internal-server.exception.ts";
import { QuotaUsed } from "../../models/quota-used.model.ts";
import { utils } from "../../utils/utils.ts";
import { BaseService } from "../base.service.ts";

export class DovecotService extends BaseService {
  public getQuotaUsed(email: string): QuotaUsed {
    try {
      const cmd = new Deno.Command("scripts/doveadm-quota-used.sh", {
        args: [email],
      });
      const { success, stdout } = cmd.outputSync();

      if (!success) {
        return new QuotaUsed(0, 0);
      }

      const [used, , percent] = utils.textDecode(stdout).split(" ");
      return new QuotaUsed(parseFloat(used), parseFloat(percent));
    } catch (error) {
      console.error(error);
      return new QuotaUsed(0, 0);
    }
  }

  public createPasswordHash(password: string): string {
    const cmd = new Deno.Command("scripts/doveadm-password.sh", {
      args: [password],
    });
    const { success, stdout } = cmd.outputSync();

    if (!success) {
      throw new InternalServerErrorException();
    }

    const passwordHash = utils.textDecode(stdout);
    return passwordHash;
  }
}
