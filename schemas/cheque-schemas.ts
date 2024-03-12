import * as z from "zod";
import { banks } from "@/data/jdata";
export const ChequeSchema = z.object({
  codeBanque: z
    .string()
    .refine(
      (value) => banks.some((bank) => bank.code === value.toUpperCase()),
      {
        message: "Code banque is invalid",
      }
    ),

  nche: z
    .string()
    .min(1, {
      message: "Le numéro de chèque est requis",
    })
    .max(7, {
      message: "Le numéro de chèque doit être inférieur à 7 caractères",
    }),
  lib: z.string().min(1, {
    message: "Le libellé est requis",
  }),
  montant: z.coerce.number().refine((value) => value > 0, {
    message: "Le montant doit être un nombre positif",
  }),
  date: z.date(),
});
