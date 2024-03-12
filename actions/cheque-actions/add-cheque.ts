"use server";

import * as z from "zod";

import { db } from "@/lib/db";

import { ChequeSchema } from "@/schemas/cheque-schemas";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    await db.cheque.create({
      data: {
        lib: values.lib,
        montant: values.montant,
        date: values.date,
        nche: values.nche,
        codeBanque: values.codeBanque,
        codeBoutique: codeBoutique,
      },
    });

    revalidatePath(`/${codeBoutique}/gestioncheques`);

    return { success: "Chèque ajouté avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  } finally {
    redirect(`/${codeBoutique}/gestioncheques`);
  }
};
