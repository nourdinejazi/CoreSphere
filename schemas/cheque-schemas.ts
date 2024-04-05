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
    .regex(/^\d+$/, {
      message: "Le numéro de chèque doit être numerique",
    })
    .length(7, {
      message: "Le numéro de chèque doit être de 7 caractères",
    })
    .max(7, {
      message: "Le numéro de chèque doit être inférieur à 7 caractères",
    }),
  lib: z.string().min(1, {
    message: "Le libellé est requis",
  }),
  montant: z.coerce
    .number()
    .multipleOf(0.001)
    .refine((value) => value > 0, {
      message: "Le montant doit être un nombre positif",
    }),
  date: z.date(),
  dateBoutique: z.date(),
});

export const reglementSchema = z.object({
  montantPaye: z.coerce
    .number()
    .multipleOf(0.001)
    .refine((value) => value > 0, {
      message: "Le montant doit être un nombre positif",
    }),
  method: z
    .enum(["CHEQUE", "ESPECE", "OR", "AVOIR", "AUTRE"])
    .refine((value) => value !== undefined, {
      message: "You must choose a value for followUp",
    }),
  dateReglement: z.date(),
});
