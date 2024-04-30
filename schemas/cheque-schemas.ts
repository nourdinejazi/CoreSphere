import * as z from "zod";
import { banks } from "@/data/jdata";
import vbanks from "@/data/vbanks.json";
import { Cheque } from "@prisma/client";
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
  dateReglement: z.date().refine((d) => d <= new Date(), {
    message:
      "La date de reglement ne peut pas être supérieure à la date d'aujourd'hui",
  }),
});

export const versementSchema = z.object({
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
  dateVersement: z.date().refine((d) => d <= new Date(), {
    message:
      "La date de reglement ne peut pas être supérieure à la date d'aujourd'hui",
  }),
  cheque: z.array(z.any()).min(1, {
    message: "Vous devez sélectionner au moins un chèque.",
  }),
});

export const PointageVersementSchema = z.object({
  day: z.coerce.string().refine(
    (value) => {
      if (isNaN(Number(value))) return false;
      return Number(value) >= 1 && Number(value) <= 31;
    },
    {
      message: "Le jour doit être compris entre 1 et 31.",
    }
  ),
  month: z.coerce.string().refine(
    (value) => {
      if (isNaN(Number(value))) return false;
      return Number(value) >= 1 && Number(value) <= 12;
    },
    {
      message: "Le jour doit être compris entre 1 et 12.",
    }
  ),
  year: z.coerce.string().refine((value) => {
    if (isNaN(Number(value))) return false;
    return value.length === 4;
  }),
});
