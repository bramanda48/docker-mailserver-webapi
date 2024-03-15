import { z } from "../../../../deps.ts";

export const DovecotMasterValidation = {
  createAcoount: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  updatePassword: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  removeAccount: z.object({
    email: z.string().email(),
  }),
};
