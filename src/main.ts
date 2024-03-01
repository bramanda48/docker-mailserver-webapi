import { Hono, cors } from "../deps.ts";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => c.text("Hono!"));
Deno.serve({ port: 3000 }, app.fetch);
