import { RestrictionAccess } from "../../models/restriction.model.ts";
import { utils } from "../../utils/utils.ts";
import { BaseService } from "../base.service.ts";

export class PostfixService extends BaseService {
  public updatePostfixRestriction(access: RestrictionAccess): boolean {
    try {
      const cmd = new Deno.Command("scripts/postfix-restriction.sh", {
        args: [access],
      });
      const { success, stdout } = cmd.outputSync();
      const output = utils.textDecode(stdout);
      if (success && output == "SUCCESS") {
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
