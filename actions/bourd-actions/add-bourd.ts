"use server";

import * as z from "zod";

import { db } from "@/lib/db";

import { versementSchema } from "@/schemas/cheque-schemas";

import { revalidatePath } from "next/cache";

export const AddBourd = async (
  values: z.infer<typeof versementSchema>,
  codeBoutique: string
) => {
  const validatedFields = versementSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("not valid");
    return { error: "Invalid fields!" };
  }

  values = { ...validatedFields.data };

  try {
    await db.versement.create({
      data: {
        dateVersement: values.dateVersement,
        codeBanque: values.codeBanque,
        num: values.num,
        cheque: {
          connect: values.cheque.map((id) => ({ id })),
        },
      },
    });

    await db.cheque.updateMany({
      where: {
        id: {
          in: values.cheque,
        },
      },
      data: {
        type: "V_C",
      },
    });

    revalidatePath(`/${codeBoutique}/gestioncheques/versement`);

    return { success: "Vérsement ajouté avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
