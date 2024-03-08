import { z } from "../../../../deps.ts";
import { RestrictionAccess } from "../../../models/restriction.model.ts";

export const RestrictionValidation = {
  getRestriction: z.object({
    email: z.string().email(),
  }),
  updateRestriction: z.object({
    access: z.nativeEnum(RestrictionAccess),
    email: z.string().email(),
  }),
  removeRestriction: z.object({
    access: z.nativeEnum(RestrictionAccess),
    email: z.string().email(),
  }),
};
