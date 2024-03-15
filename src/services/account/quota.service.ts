import { NotFoundException } from "../../exceptions/not-found.exception.ts";
import { MailAccount } from "../../models/mail.model.ts";
import { Quota } from "../../models/quota.model.ts";
import { utils } from "../../utils/utils.ts";
import { BaseService } from "../base.service.ts";
import { DovecotService } from "../dovecot/dovecot.service.ts";

export class QuotaService extends BaseService {
  constructor(private dovecotService: DovecotService = new DovecotService()) {
    super();
  }

  public async updateQuota(email: string, quota: string): Promise<Quota> {
    const getAccount: string[] = await this.dbAccount.findText(email);
    if (getAccount.length == 0) {
      throw new NotFoundException("Mail account does not exist");
    }

    const getQuota: string[] = await this.dbQuota.findText(email);
    if (getQuota.length > 0) {
      this.dbQuota.replace(getQuota[0], email, quota);
    } else {
      this.dbQuota.addOrAppend(email, quota);
    }

    const { $quotaUsed, $quotaUsedPercent } =
      this.dovecotService.getQuotaUsed(email);
    return new Quota(utils.iecToNum(quota), $quotaUsed, $quotaUsedPercent);
  }

  public async removeQuota(email: string): Promise<MailAccount> {
    const getQuota: string[] = await this.dbQuota.findText(email);
    if (getQuota.length == 0) {
      throw new NotFoundException("Mail account does not exist");
    }

    const quota: string = getQuota[0];
    this.dbQuota.remove(quota);
    return new MailAccount(email);
  }
}
