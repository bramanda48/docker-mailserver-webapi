import { InternalServerErrorException } from "../../exceptions/internal-server.exception.ts";
import { NotFoundException } from "../../exceptions/not-found.exception.ts";
import {
  Restriction,
  RestrictionAccess,
} from "../../models/restriction.model.ts";
import { BaseService } from "../base.service.ts";
import { PostfixService } from "../postfix/postfix.service.ts";

export class RestrictionService extends BaseService {
  constructor(private postfixService: PostfixService = new PostfixService()) {
    super();
  }

  public async getRestriction(email: string): Promise<Restriction> {
    const getAccount: string[] = await this.dbAccount.findText(email);
    if (getAccount.length == 0) {
      throw new NotFoundException("Mail account does not exist");
    }

    const getAccessSend: string[] = await this.dbAccessSend.findText(email);
    const getAccessReceive: string[] = await this.dbAccessReceive.findText(
      email
    );

    return new Restriction(
      getAccessSend.length > 0,
      getAccessReceive.length > 0
    );
  }

  public async updateRestriction(
    access: RestrictionAccess,
    email: string
  ): Promise<Restriction> {
    const restriction = await this.getRestriction(email);

    let accessSend: boolean = restriction.$send;
    let accessReceive: boolean = restriction.$receive;

    switch (access) {
      case RestrictionAccess.send:
        if (!restriction.$send) {
          this.dbAccessSend.addOrAppend(email, "REJECT");
          accessSend = true;
        }
        break;
      case RestrictionAccess.receive:
        if (!restriction.$receive) {
          this.dbAccessReceive.addOrAppend(email, "REJECT");
          accessReceive = true;
        }
        break;
      default:
        throw new InternalServerErrorException("Invalid access");
    }

    this.postfixService.updatePostfixRestriction(access);
    return new Restriction(accessSend, accessReceive);
  }

  public async removeRestriction(
    access: RestrictionAccess,
    email: string
  ): Promise<Restriction> {
    const getAccount: string[] = await this.dbAccount.findText(email);
    if (getAccount.length == 0) {
      throw new NotFoundException("Mail account does not exist");
    }

    const getAccessSend: string[] = await this.dbAccessSend.findText(email);
    const getAccessReceive: string[] = await this.dbAccessReceive.findText(
      email
    );

    let accessSend: boolean = getAccessSend.length > 0;
    let accessReceive: boolean = getAccessReceive.length > 0;

    switch (access) {
      case RestrictionAccess.send:
        if (accessSend) {
          this.dbAccessSend.remove(getAccessSend[0]);
          accessSend = false;
        }
        break;
      case RestrictionAccess.receive:
        if (accessReceive) {
          this.dbAccessReceive.remove(getAccessReceive[0]);
          accessReceive = false;
        }
        break;
      default:
        throw new InternalServerErrorException("Invalid access");
    }
    return new Restriction(accessSend, accessReceive);
  }
}
