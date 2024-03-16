import { z } from "../../../../deps.ts";
import { utils } from "../../../utils/utils.ts";

export const DkimValidation = {
  createKey: z.object({
    selector: z.string(),
    domain: z.custom(utils.isFQDN, { message: "Invalid. Must be FQDN" }),
    keytype: z.string(),
    keysize: z.number(),
  }),
};
