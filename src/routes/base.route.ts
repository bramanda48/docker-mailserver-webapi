import { AliasRoute } from "./V1/alias.route.ts";
import { EmailRoute } from "./V1/email.route.ts";
import { QuotaRoute } from "./V1/quota.route.ts";

const defaultRoutes = [
  {
    path: `/api/v1/email`,
    route: EmailRoute,
  },
  {
    path: `/api/v1/alias`,
    route: AliasRoute,
  },
  {
    path: `/api/v1/quota`,
    route: QuotaRoute,
  },
];
export const DefaultRoute = defaultRoutes;
