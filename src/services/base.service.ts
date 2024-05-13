import { fs, path, sqlite3 } from "../../deps.ts";
import { ServiceUnavailableException } from "../exceptions/service-unavailable.exception.ts";
import { DatabaseName } from "./database.service.ts";
import { DatabaseService } from "./database.service.ts";
import { EnvService } from "./env.service.ts";

export class BaseService {
  protected env: EnvService;
  protected dbAccount: DatabaseService;
  protected dbAccessSend: DatabaseService;
  protected dbAccessReceive: DatabaseService;
  protected dbDovecotMater: DatabaseService;
  protected dbQuota: DatabaseService;
  protected dbVirtual: DatabaseService;
  protected dbPasswd: DatabaseService;
  protected dbRelay: DatabaseService;

  constructor() {
    this.env = new EnvService();
    this.dbAccount = new DatabaseService(DatabaseName.ACCOUNTS);
    this.dbAccessSend = new DatabaseService(DatabaseName.ACCESS_SEND);
    this.dbAccessReceive = new DatabaseService(DatabaseName.ACCESS_RECEIVE);
    this.dbDovecotMater = new DatabaseService(DatabaseName.DOVECOT_MASTERS);
    this.dbQuota = new DatabaseService(DatabaseName.QUOTA);
    this.dbVirtual = new DatabaseService(DatabaseName.VIRTUAL);
    this.dbPasswd = new DatabaseService(DatabaseName.PASSWD);
    this.dbRelay = new DatabaseService(DatabaseName.RELAY);
  }

  protected get dbFail2ban(): sqlite3.Database {
    if (this.env.get<boolean>("ENABLE_FAIL2BAN") == false) {
      // Reference : https://docker-mailserver.github.io/docker-mailserver/latest/config/environment/#enable_fail2ban
      throw new ServiceUnavailableException(
        "Fail2ban is not running. Ensure you've included 'ENABLE_FAIL2BAN' in your compose file",
        "SERVICE_FAIL2BAN_UNAVAILABLE"
      );
    }

    const dbPath = path.resolve(this.env.get("WEB_API_FAIL2BAN_SQLITE_PATH"));
    if (!fs.existsSync(dbPath)) {
      throw new ServiceUnavailableException(
        `Unable to open fail2ban database in ${dbPath}`,
        "SERVICE_FAIL2BAN_UNAVAILABLE"
      );
    }

    // open database
    return new sqlite3.Database(dbPath, {
      readonly: true,
    });
  }
}
