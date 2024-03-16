import { MiddlewareHandler } from "../../deps.ts";
import { ServiceUnavailableException } from "../exceptions/service-unavailable.exception.ts";

export const demo = (options: { enable: boolean }): MiddlewareHandler => {
  if (!options) {
    throw new Error(`demo middleware requires options "enable".`);
  }
  return async function demo(_, next) {
    if (options.enable) {
      throw new ServiceUnavailableException(
        "The application is running in demo mode, so all requests will not be processed. Only the Swagger documentation is enabled."
      );
    } else {
      await next();
    }
  };
};
