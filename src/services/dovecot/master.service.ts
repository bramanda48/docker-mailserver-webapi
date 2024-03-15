import { ConflictException } from "../../exceptions/conflict.excpetion.ts";
import { NotFoundException } from "../../exceptions/not-found.exception.ts";
import { DovecotMaster } from "../../models/dovecot-master.model.ts";
import { BaseService } from "../base.service.ts";
import { DovecotService } from "./dovecot.service.ts";

export class DovecotMasterService extends BaseService {
  constructor(private dovecotService: DovecotService = new DovecotService()) {
    super();
  }

  public async getAllAccount(): Promise<DovecotMaster[]> {
    const account: DovecotMaster[] = [];
    const getAccount: string[][] = await this.dbDovecotMater.find({
      split: true,
    });

    for (const [username, password] of getAccount) {
      account.push(new DovecotMaster(username, password));
    }
    return account;
  }

  public async createAccount(
    username: string,
    password: string
  ): Promise<DovecotMaster> {
    const getAccount: string[] = await this.dbDovecotMater.findText(username);
    if (getAccount.length > 0) {
      throw new ConflictException("Account already exists");
    }

    password = this.dovecotService.createPasswordHash(password);

    this.dbDovecotMater.addOrAppend(username, password);
    return new DovecotMaster(username, password);
  }

  public async updatePassword(
    username: string,
    password: string
  ): Promise<DovecotMaster> {
    const getAccount: string[] = await this.dbDovecotMater.findText(username);
    if (getAccount.length == 0) {
      throw new NotFoundException("Account does not exist");
    }

    const account: string = getAccount[0];
    password = this.dovecotService.createPasswordHash(password);

    this.dbDovecotMater.replace(account, username, password);
    return new DovecotMaster(username, password);
  }

  public async removeAccount(username: string): Promise<DovecotMaster> {
    const getAccount: string[] = await this.dbDovecotMater.findText(username);
    if (getAccount.length == 0) {
      throw new NotFoundException("Account does not exist");
    }

    const account: string = getAccount[0];
    this.dbDovecotMater.remove(account);
    return new DovecotMaster(username);
  }
}
