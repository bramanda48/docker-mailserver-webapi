import { Hono } from "hono";
import { AliasController } from "../../controllers/V1/alias.controller.ts";

const route = new Hono();

// Add the route
route.post("/", AliasController.createAlias);
route.delete("/", AliasController.removeAlias);
export const AliasRoute = route;
