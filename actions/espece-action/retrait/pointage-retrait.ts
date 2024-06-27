"use server";

import * as z from "zod";

import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";
import { PointageVersementSchema } from "@/schemas/cheque-schemas";

export const PointageRetrait = async (
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
  const datePointage = new Date(`${values.year}-${values.month}-${values.day}`);
  try {
    if (datePointage > new Date()) {
      return {
        error:
          "Date pointage ne peut pas être supérieure à la date d'aujourd'hui",
      };
    }

    const retrait = await db.retrait.findUnique({
      where: {
        id: id,
      },
    });

    if (!retrait) {
      return { error: "Retrait non trouvé!" };
    }

    if (retrait.dateRetrait > datePointage) {
      return {
        error:
          "Date pointage ne peut pas être inférieur à la date de vérsement!",
      };
    }

    await db.retrait.update({
      where: {
        id: id,
      },
      data: {
        dateBanque: datePointage,
      },
    });

    revalidatePath(`/${codeBoutique}/gestionespece/pretrait`);

    return { success: "Pointage ajouté avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
