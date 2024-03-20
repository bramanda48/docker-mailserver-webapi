import { utils } from "./utils.ts";

// This function from https://github.com/pbojinov/request-ip/blob/master/src/index.js
export const parseClientIp = (
  request: Request,
  handler: Deno.ServeHandlerInfo
): string => {
  // Standard headers used by Amazon EC2, Heroku, and others.
  if (request.headers.has("x-client-ip")) {
    return request.headers.get("x-client-ip");
  }

  // Load-balancers (AWS ELB) or proxies.
  if (request.headers.has("x-forwarded-for")) {
    // x-forwarded-for may return multiple IP addresses in the format:
    // "client IP, proxy 1 IP, proxy 2 IP"
    // Therefore, the right-most IP address is the IP address of the most recent proxy
    // and the left-most IP address is the IP address of the originating client.
    // source: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For
    // Azure Web App's also adds a port for some reason, so we'll only use the first part (the IP)
    const value = request.headers.get("x-forwarded-for");
    const forwardedIps = value.split(",").map((e) => {
      const ip = e.trim();
      if (ip.includes(":")) {
        const splitted = ip.split(":");
        // make sure we only use this if it's ipv4 (ip:port)
        if (splitted.length === 2) {
          return splitted[0];
        }
      }
      return ip;
    });
    // Sometimes IP addresses in this header can be 'unknown' (http://stackoverflow.com/a/11285650).
    // Therefore taking the right-most IP address that is not unknown
    // A Squid configuration directive can also set the value to "unknown" (http://www.squid-cache.org/Doc/config/forwarded_for/)
    for (let i = 0; i < forwardedIps.length; i++) {
      if (utils.isValidIP(forwardedIps[i])) {
        return forwardedIps[i];
      }
    }
  }

  // Cloudflare.
  // @see https://support.cloudflare.com/hc/en-us/articles/200170986-How-does-Cloudflare-handle-HTTP-Request-headers-
  // CF-Connecting-IP - applied to every request to the origin.
  if (request.headers.has("cf-connecting-ip")) {
    return request.headers.get("cf-connecting-ip");
  }

  // DigitalOcean.
  // @see https://www.digitalocean.com/community/questions/app-platform-client-ip
  // DO-Connecting-IP - applied to app platform servers behind a proxy.
  if (request.headers.has("do-connecting-ip")) {
    return request.headers.get("do-connecting-ip");
  }

  // Fastly and Firebase hosting header (When forwared to cloud function)
  if (request.headers.has("fastly-client-ip")) {
    return request.headers.get("fastly-client-ip");
  }

  // Akamai and Cloudflare: True-Client-IP.
  if (request.headers.has("true-client-ip")) {
    return request.headers.get("true-client-ip");
  }

  // Default nginx proxy/fcgi; alternative to x-forwarded-for, used by some proxies.
  if (request.headers.has("x-real-ip")) {
    return request.headers.get("x-real-ip");
  }

  if (request.headers.has("x-forwarded")) {
    return request.headers.get("x-forwarded");
  }

  if (request.headers.has("forwarded-for")) {
    return request.headers.get("forwarded-for");
  }

  // Remote address checks.
  return handler.remoteAddr.hostname;
};
