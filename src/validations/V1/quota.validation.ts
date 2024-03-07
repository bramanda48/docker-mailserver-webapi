import { z } from "../../../deps.ts";

export const QuotaValidation = {
  updateQuota: z.object({
    email: z.string().email(),
    quota: z.string().regex(new RegExp(/([0-9\.]+)([KMGTPEZYRQ]?)([i]?)/, "i")),
  }),
  removeQuota: z.object({
    email: z.string().email(),
  }),
};
