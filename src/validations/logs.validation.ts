import { z } from "../../deps.ts";

export const LogsValidation = {
  getFail2banLogs: z.object({
    limit: z.preprocess(Number, z.number()).default(25),
  }),
};
