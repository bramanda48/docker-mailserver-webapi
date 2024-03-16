import { z } from "../../../../deps.ts";

export const RelayValidation = {
  addAuth: z.object({
    domain: z.string(),
    username: z.string(),
    password: z.string(),
  }),
  addDomain: z.object({
    domain: z.string(),
    host: z.string(),
    port: z.number(),
  }),
  excludeDomain: z.object({
    domain: z.string(),
  }),
};
