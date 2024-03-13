import { z } from "../../../../deps.ts";

export const DkimValidation = {
  createKey: z.object({
    selector: z.string(),
    domain: z.string(),
    keytype: z.string(),
    keysize: z.number(),
  }),
};
