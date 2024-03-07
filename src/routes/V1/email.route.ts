import { Hono } from "hono";
import { EmailController } from "../../controllers/V1/email.controller.ts";

const route = new Hono();

// Add the route
route.get("/", EmailController.getAccount);
route.post("/", EmailController.createAccount);
route.patch("/", EmailController.updatePassword);
route.delete("/", EmailController.removeAccount);
export const EmailRoute = route;
