import { swaggerUI } from "hono/swagger-ui";
import { Hono, cors, dotenv, fs, prettyJSON, serveStatic } from "../deps.ts";
import { notFoundHandler } from "./middlewares/error.middleware.ts";
import { errorHandler } from "./middlewares/error.middleware.ts";
import { DefaultRoute } from "./routes/base.route.ts";
import { apiKeyAuth } from "./middlewares/apikey-auth.middleware.ts";
import { demo } from "./middlewares/demo.middleware.ts";
import { utils } from "./utils/utils.ts";

const app = new Hono<Environment>();
const cwd = Deno.cwd();

// environment variables
const env = dotenv.loadSync({
  allowEmptyValues: true,
  export: true,
});

// middleware
app.use("*", cors());
app.use("*", prettyJSON());
app.use(
  "/api/*",
  demo({ enable: env.DENO_ENV == "demo" }),
  apiKeyAuth({
    key: env.WEB_API_KEY,
    whitelist: env.WEB_API_WHITELISTED_IP.split(","),
  })
);
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

// run server
Deno.serve({ port: 3000 }, (request, handler) => {
  const remoteAddr = () => utils.getClientIp(request, handler);
  return app.fetch(request, { ...env, remoteAddr });
});
console.log(`Running on directory ${cwd}`);
