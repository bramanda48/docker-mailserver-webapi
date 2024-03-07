import { z } from "../../../deps.ts";

export const AliasValidation = {
  createAlias: z
    .object({
      email_alias: z.string().email(),
      email_recipient: z.array(z.string().email()),
    })
    .refine((param) => !param.email_recipient.includes(param.email_alias), {
      message: "Must not contain email_alias",
      path: ["email_recipient"],
    })
    .transform((param) => ({
      emailAlias: param.email_alias,
      emailRecipient: param.email_recipient,
    })),
  removeAlias: z
    .object({
      email_alias: z.string().email(),
      email_recipient: z.string().email(),
    })
    .transform((param) => ({
      emailAlias: param.email_alias,
      emailRecipient: param.email_recipient,
    })),
};
