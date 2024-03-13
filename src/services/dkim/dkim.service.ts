import { path } from "../../../deps.ts";
import { InternalServerErrorException } from "../../exceptions/internal-server.exception.ts";
import { DKIMValidator } from "../../models/dkim.model.ts";
import { DKIM } from "../../models/dkim.model.ts";
import { DnsRecord } from "../../models/dns-record.model.ts";
import { utils } from "../../utils/utils.ts";
import { BaseService } from "../base.service.ts";

export class DkimService extends BaseService {
  private configPath: string;

  constructor() {
    super();
    this.configPath = this.env.get("WEB_API_DMS_CONFIG_PATH");
  }

  public createKey(
    selector: string,
    domain: string,
    keytype: string,
    keysize: number
  ): DKIM {
    this.createDkimKey(selector, domain, keytype, keysize);

    const enableRspamd: boolean = this.env.get("ENABLE_RSPAMD");
    const validator: DKIMValidator = enableRspamd
      ? DKIMValidator.rspamd
      : DKIMValidator.opendkim;

    let publicKey: string = "";
    let privateKey: string = "";
    let dkimKey: string = "";

    if (validator == DKIMValidator.rspamd) {
      const filename: string =
        keytype == "ed25519"
          ? `${keytype}-${selector}-${domain}`
          : `${keytype}-${keysize}-${selector}-${domain}`;

      privateKey = path.resolve(
        this.configPath,
        "rspamd",
        "dkim",
        `${filename}.private.txt`
      );
      privateKey = Deno.readTextFileSync(privateKey);
    } else if (validator == DKIMValidator.opendkim) {
      privateKey = path.resolve(
        this.configPath,
        "opendkim",
        "keys",
        domain,
        `${selector}.private`
      );
      privateKey = Deno.readTextFileSync(privateKey);
    } else {
      throw new InternalServerErrorException("Invalid validator");
    }

    publicKey = this.createPublicKey(privateKey);
    dkimKey = publicKey
      .split(new RegExp(/\r?\n/))
      .join("")
      .match(
        new RegExp(/-----BEGIN PUBLIC KEY-----(.*)-----END PUBLIC KEY-----/)
      )[1];

    return new DKIM(
      validator,
      selector,
      domain,
      publicKey,
      undefined,
      new DnsRecord(
        `${selector}._domainkey`,
        "TXT",
        `v=DKIM1; k=rsa; p=${dkimKey}`
      )
    );
  }

  private createDkimKey(
    selector: string,
    domain: string,
    keytype: string,
    keysize: number
  ): void {
    const cmd = new Deno.Command("scripts/dkim-key.sh", {
      args: [selector, domain, keytype, keysize.toString()],
    });
    const { success } = cmd.outputSync();
    if (!success) {
      throw new InternalServerErrorException(`Failed to create key`);
    }
  }

  private createPublicKey(privateKey: string, keytype: string = "rsa"): string {
    const cmd = new Deno.Command("scripts/openssl-public-key.sh", {
      args: [privateKey, keytype],
    });
    const { success, stdout } = cmd.outputSync();
    if (!success) {
      throw new InternalServerErrorException(`Failed to create key`);
    }
    return utils.textDecode(stdout);
  }
}
