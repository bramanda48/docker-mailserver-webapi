import { RelayAuth } from "../../models/relay-auth.model.ts";
import { RelayDomain } from "../../models/relay-domain.model.ts";
import { RelayExclude } from "../../models/relay-exclude.model.ts";
import { BaseService } from "../base.service.ts";

export class RelayService extends BaseService {
  public async addAuth(
    domain: string,
    username: string,
    password: string
  ): Promise<RelayAuth> {
    const sender: string = `@${domain}`;
    const relayHostEntry: string = `${username}:${password}`;
    const getRelay: string[] = await this.dbRelay.findText(sender);
    if (getRelay.length > 0) {
      this.dbRelay.replace(getRelay[0], sender, relayHostEntry);
    } else {
      this.dbRelay.addOrAppend(sender, relayHostEntry);
    }
    return new RelayAuth(domain, username, password);
  }

  public async addDomain(
    domain: string,
    host: string,
    port: number
  ): Promise<RelayDomain> {
    const sender: string = `@${domain}`;
    const relayHostEntry: string = `[${host}]:${port}`;
    const getRelay: string[] = await this.dbRelay.findText(sender);
    if (getRelay.length > 0) {
      this.dbRelay.replace(getRelay[0], sender, relayHostEntry);
    } else {
      this.dbRelay.addOrAppend(sender, relayHostEntry);
    }
    return new RelayDomain(domain, host, port);
  }

  public async excludeDomain(domain: string): Promise<RelayExclude> {
    const sender: string = `@${domain}`;
    const getExclude: string[] = await this.dbRelay.findText(sender);
    if (getExclude.length > 0) {
      this.dbRelay.replace(getExclude[0], sender);
    } else {
      this.dbRelay.addOrAppend(sender);
    }
    return new RelayExclude(domain);
  }
}
