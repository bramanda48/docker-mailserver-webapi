import { Context } from "../../deps.ts";
import { HTTPException, MiddlewareHandler } from "../../deps.ts";

export const apiKeyAuth = (options: {
  key: string;
  whitelist?: string[];
}): MiddlewareHandler => {
  if (!options) {
    throw new Error(`apikey auth middleware requires options "key".`);
  }
  return async function apiKeyAuth(ctx: Context<Environment>, next) {
    const clientIP: string = ctx.env.remoteAddr();
    if (!options.whitelist || !options.whitelist.includes(clientIP)) {
      throw new HTTPException(403, {
        message: `Forbidden. Your IP "${clientIP}" is not in the whitelist.`,
      });
    }

    const isValidRequest: boolean = ctx.req.header("X-API-KEY") === options.key;
    if (!isValidRequest) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }
    await next();
    return;
  };
};
