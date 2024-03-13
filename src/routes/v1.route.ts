import { Hono } from "hono";
import { AliasController } from "../controllers/V1/account/alias.controller.ts";
import { EmailController } from "../controllers/V1/account/email.controller.ts";
import { RestrictionController } from "../controllers/V1/account/restriction.controller.ts";
import { QuotaController } from "../controllers/V1/account/quota.controller.ts";
import { DkimController } from "../controllers/V1/dkim/dkim.controller.ts";

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
export const V1Route = route;
