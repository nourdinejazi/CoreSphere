"use server";

import * as z from "zod";

import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";
import { PointageVersementSchema } from "@/schemas/cheque-schemas";

export const PointageVersement = async (
  values: z.infer<typeof PointageVersementSchema>,
  codeBoutique: string,
  id: string
) => {
  const validatedFields = PointageVersementSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("not valid");
    return { error: "Invalid fields!" };
  }

  values = { ...validatedFields.data };

  try {
    await db.cheque.update({
      where: {
        id: id,
      },
      data: {
        dateBanque: new Date(`${values.year}-${values.month}-${values.day}`),
      },
    });

    revalidatePath(`/${codeBoutique}/gestioncheques/pversement`);

    return { success: "Pointage ajouté avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
