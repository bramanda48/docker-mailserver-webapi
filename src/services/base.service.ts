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
}
