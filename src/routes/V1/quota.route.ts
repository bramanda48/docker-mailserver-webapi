import { Hono } from "hono";
import { QuotaController } from "../../controllers/V1/quota.controller.ts";

const route = new Hono();

// Add the route
route.patch("/", QuotaController.updateQuota);
route.delete("/", QuotaController.removeQuota);
export const QuotaRoute = route;
