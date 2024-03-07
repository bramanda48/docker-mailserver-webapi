import { z } from "../../../deps.ts";

export const AliasValidation = {
  createAlias: z
    .object({
      emailAlias: z.string().email(),
      emailRecipient: z.array(z.string().email()),
    })
    .refine((param) => !param.emailRecipient.includes(param.emailAlias), {
      message: "Must not contain emailAlias",
      path: ["emailRecipient"],
    }),
  removeAlias: z.object({
    emailAlias: z.string().email(),
    emailRecipient: z.string().email(),
  }),
};
