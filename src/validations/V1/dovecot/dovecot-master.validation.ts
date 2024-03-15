import { z } from "../../../../deps.ts";

export const DovecotMasterValidation = {
  createAcoount: z.object({
    username: z.string(),
    password: z.string(),
  }),
  updatePassword: z.object({
    username: z.string(),
    password: z.string(),
  }),
  removeAccount: z.object({
    username: z.string(),
  }),
};
