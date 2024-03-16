import { z } from "../../../../deps.ts";

export const Fail2banValidation = {
  banIpAddress: z.object({
    ip: z.string().ip(),
  }),
  unbanIpAddress: z.object({
    ip: z.string().ip(),
  }),
};
