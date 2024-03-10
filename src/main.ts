import { swaggerUI } from "hono/swagger-ui";
import { Hono, cors, fs, prettyJSON, serveStatic } from "../deps.ts";
import { notFoundHandler } from "./middlewares/error.middleware.ts";
import { errorHandler } from "./middlewares/error.middleware.ts";
import { DefaultRoute } from "./routes/base.route.ts";

const app = new Hono();
const cwd = Deno.cwd();

// middleware
app.use("*", cors());
app.use("*", prettyJSON());
app.use(
  "/static/*",
  serveStatic({
    root: "./",
    getContent: async (path) => {
      path = !fs.existsSync(path) ? "static/index.html" : path;
      return await Deno.readFile(path);
    },
  })
);
app.get(
  "/",
  swaggerUI({
    url: "/static/openapi.yaml",
  })
);

// errors handler
app.onError(errorHandler);
app.notFound(notFoundHandler);

DefaultRoute.forEach((route) => {
  app.route(`${route.path}`, route.route);
});
Deno.serve({ port: 3000 }, app.fetch);
console.log(`Running on directory ${cwd}`);
