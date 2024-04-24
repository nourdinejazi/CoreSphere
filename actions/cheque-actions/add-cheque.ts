"use server";

import * as z from "zod";

import { db } from "@/lib/db";

import { ChequeSchema } from "@/schemas/cheque-schemas";

import { revalidatePath } from "next/cache";

export const AddCheque = async (
  values: z.infer<typeof ChequeSchema>,
  codeBoutique: string
) => {
  const validatedFields = ChequeSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("not valid");
    return { error: "Invalid fields!" };
  }

  values = { ...validatedFields.data };
  try {
    // const cheque = await db.cheque.findFirst({
    //   where: {
    //     nche: values.nche,
    //   },
    // });

    // if (cheque) {
    //   return { warning: "Ce chèque existe déjà !" };
    // }

    await db.cheque.create({
      data: {
        lib: values.lib,
        montant: values.montant,
        date: values.date,
        dateBoutique: values.dateBoutique,
        nche: values.nche,
        codeBanque: values.codeBanque,
        codeBoutique: codeBoutique,
        restapaye: values.montant,
      },
    });

    revalidatePath(`/${codeBoutique}/gestioncheques/new`);

    return { success: "Chèque ajouté avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
