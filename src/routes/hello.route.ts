import { Hono } from "hono";
import { HelloController } from "../controllers/hello.controller.ts";

const route = new Hono();

// Add the route
route.get("/", HelloController.getHello);
export const HelloRoute = route;
