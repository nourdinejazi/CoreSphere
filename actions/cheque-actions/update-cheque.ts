"use server";

import * as z from "zod";

import { db } from "@/lib/db";

import { ChequeSchema } from "@/schemas/cheque-schemas";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const UpdateCheque = async (
  values: z.infer<typeof ChequeSchema>,
  codeBoutique: string,
  chequeId: string
) => {
  const validatedFields = ChequeSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("not valid");
    return { error: "Invalid fields!" };
  }

  values = { ...validatedFields.data };
  try {
    await db.cheque.update({
      where: {
        id: chequeId,
      },
      data: {
        lib: values.lib,
        montant: values.montant,
        date: values.date,
        nche: values.nche,
        codeBanque: values.codeBanque,
      },
    });
    console.log("aaa", codeBoutique);

    revalidatePath(`/${codeBoutique}/gestioncheques`);

    return { success: "Chèque Modifié avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  } finally {
    console.log("aaa", codeBoutique);
    // redirect(`/${codeBoutique}/gestioncheques`);
  }
};
