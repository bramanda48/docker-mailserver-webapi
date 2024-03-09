import { DatabaseName } from "./database.service.ts";
import { DatabaseService } from "./database.service.ts";
import { EnvService } from "./env.service.ts";

export class BaseService {
  constructor(
    public env: EnvService = new EnvService(),
    public dbAccount: DatabaseService = new DatabaseService(
      DatabaseName.ACCOUNTS
    ),
    public dbAccessSend: DatabaseService = new DatabaseService(
      DatabaseName.ACCESS_SEND
    ),
    public dbAccessReceive: DatabaseService = new DatabaseService(
      DatabaseName.ACCESS_RECEIVE
    ),
    public dbDovecotMater: DatabaseService = new DatabaseService(
      DatabaseName.DOVECOT_MASTERS
    ),
    public dbQuota: DatabaseService = new DatabaseService(DatabaseName.QUOTA),
    public dbVirtual: DatabaseService = new DatabaseService(
      DatabaseName.VIRTUAL
    ),
    public dbPasswd: DatabaseService = new DatabaseService(DatabaseName.PASSWD),
    public dbRelay: DatabaseService = new DatabaseService(DatabaseName.RELAY)
  ) {}
}
