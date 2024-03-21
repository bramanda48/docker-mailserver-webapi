import { z } from "../../../../deps.ts";
import { utils } from "../../../utils/utils.ts";

export const RelayValidation = {
  addAuth: z.object({
    domain: z.custom(utils.isFQDN, { message: "Invalid. Must be FQDN" }),
    username: z.string(),
    password: z.string(),
  }),
  addDomain: z.object({
    domain: z.custom(utils.isFQDN, { message: "Invalid. Must be FQDN" }),
    host: z.string(),
    port: z.number(),
  }),
  excludeDomain: z.object({
    domain: z.custom(utils.isFQDN, { message: "Invalid. Must be FQDN" }),
  }),
};
