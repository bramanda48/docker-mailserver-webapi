import { Hono } from "hono";
import { AliasController } from "../controllers/V1/account/alias.controller.ts";
import { EmailController } from "../controllers/V1/account/email.controller.ts";
import { RestrictionController } from "../controllers/V1/account/restriction.controller.ts";
import { QuotaController } from "../controllers/V1/account/quota.controller.ts";
import { DkimController } from "../controllers/V1/dkim/dkim.controller.ts";
import { DovecotMasterController } from "../controllers/V1/dovecot/dovecot-master.controller.ts";
import { Fail2banController } from "../controllers/V1/fail2ban/fail2ban.controller.ts";
import { RelayController } from "../controllers/V1/relay/relay.controller.ts";
import { LogsController } from "../controllers/logs.controller.ts";

const route = new Hono();

// Add the route
route.post("/config/dkim", DkimController.createKey);

route.get("/email", EmailController.getAccount);
route.post("/email", EmailController.createAccount);
route.patch("/email", EmailController.updatePassword);
route.delete("/email", EmailController.removeAccount);

route.get("/email/restrict", RestrictionController.getRestriction);
route.post("/email/restrict", RestrictionController.updateRestriction);
route.delete("/email/restrict", RestrictionController.removeRestriction);

route.post("/alias", AliasController.createAlias);
route.delete("/alias", AliasController.removeAlias);

route.patch("/quota", QuotaController.updateQuota);
route.delete("/quota", QuotaController.removeQuota);

route.get("/dovecot/master", DovecotMasterController.getAccount);
route.post("/dovecot/master", DovecotMasterController.createAccount);
route.patch("/dovecot/master", DovecotMasterController.updatePassword);
route.delete("/dovecot/master", DovecotMasterController.removeAccount);

route.post("/relay/add-auth", RelayController.addAuth);
route.post("/relay/add-domain", RelayController.addDomain);
route.post("/relay/exclude-domain", RelayController.excludeDomain);

route.get("/fail2ban", Fail2banController.getJail);
route.post("/fail2ban/ban/:ip", Fail2banController.banIpAddress);
route.post("/fail2ban/unban/:ip", Fail2banController.unbanIpAddress);

route.get("/logs/fail2ban", LogsController.getFail2banLogs);
export const V1Route = route;
