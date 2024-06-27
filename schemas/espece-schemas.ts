import * as z from "zod";

import vbanks from "@/data/vbanks.json";

export const RetraitSchema = z.object({
  codeBanque: z
    .string()
    .refine(
      (value) => vbanks.some((bank) => bank.CODB === value.toUpperCase()),
      {
        message: "Code banque is invalid",
      }
    ),
  num: z
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
  dateRetrait: z.date().refine((d) => d <= new Date(), {
    message:
      "La date de Retrait ne peut pas être supérieure à la date d'aujourd'hui",
  }),
  montant: z.coerce
    .number()
    .multipleOf(0.001)
    .refine((value) => value > 0, {
      message: "Le montant doit être un nombre positif",
    }),
});

export const VersementEspSchema = z.object({
  codeBanque: z
    .string()
    .refine(
      (value) => vbanks.some((bank) => bank.CODB === value.toUpperCase()),
      {
        message: "Code banque is invalid",
      }
    ),
  num: z
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
  dateVersementEsp: z.date().refine((d) => d <= new Date(), {
    message:
      "La date de Retrait ne peut pas être supérieure à la date d'aujourd'hui",
  }),
  montant: z.coerce
    .number()
    .multipleOf(0.001)
    .refine((value) => value > 0, {
      message: "Le montant doit être un nombre positif",
    }),
});
