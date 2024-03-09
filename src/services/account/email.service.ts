import { ConflictException } from "../../exceptions/conflict.excpetion.ts";
import { NotFoundException } from "../../exceptions/not-found.exception.ts";
import { MailAccount } from "../../models/mail.model.ts";
import { Quota } from "../../models/quota.model.ts";
import { utils } from "../../utils/utils.ts";
import { BaseService } from "../base.service.ts";
import { DovecotService } from "../dovecot/dovecot.service.ts";
import { AliasService } from "./alias.service.ts";
import { RestrictionService } from "./restriction.service.ts";

export class EmailService extends BaseService {
  constructor(
    private dovecotService: DovecotService = new DovecotService(),
    private aliasService: AliasService = new AliasService(),
    private restrictionService: RestrictionService = new RestrictionService()
  ) {
    super();
  }

  public async getAllAccount(): Promise<MailAccount[]> {
    const account: MailAccount[] = [];
    const getAccount: string[][] = await this.dbAccount.find({
      split: true,
    });

    for (const [email, password] of getAccount) {
      const alias = await this.aliasService.getAlias(email);
      const quota = await this.getQuota(email);
      const restriction = await this.restrictionService.getRestriction(email);
      account.push(new MailAccount(email, password, alias, quota, restriction));
    }
    return account;
  }

  public async getQuota(email: string): Promise<Quota> {
    const getQuota: string[] = await this.dbQuota.findText(email, {
      split: true,
    });
    if (getQuota.length == 0) {
      return new Quota(0, 0, 0);
    }

    const quota: string = getQuota[0][1];
    const { $quotaUsed, $quotaUsedPercent } =
      this.dovecotService.getQuotaUsed(email);

    return new Quota(utils.iecToNum(quota), $quotaUsed, $quotaUsedPercent);
  }

  public async createAccount(
    email: string,
    password: string
  ): Promise<MailAccount> {
    const getAccount: string[] = await this.dbAccount.findText(email);
    if (getAccount.length > 0) {
      throw new ConflictException("Mail account already exists");
    }

    password = this.dovecotService.createPasswordHash(password);

    this.dbAccount.addOrAppend(email, password);
    return new MailAccount(email, password);
  }

  public async updatePassword(
    email: string,
    password: string
  ): Promise<MailAccount> {
    const getAccount: string[] = await this.dbAccount.findText(email);
    if (getAccount.length == 0) {
      throw new NotFoundException("Mail account does not exist");
    }

    const account: string = getAccount[0];
    password = this.dovecotService.createPasswordHash(password);

    this.dbAccount.replace(account, email, password);
    return new MailAccount(email, password);
  }

  public async removeAccount(email: string): Promise<boolean> {
    const getAccount: string[] = await this.dbAccount.findText(email);
    if (getAccount.length == 0) {
      throw new NotFoundException("Mail account does not exist");
    }

    const account: string = getAccount[0];
    this.dbAccount.remove(account);
    return null;
  }
}
