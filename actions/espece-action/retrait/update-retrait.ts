"use server";

import * as z from "zod";

import { db } from "@/lib/db";

import { RetraitSchema } from "@/schemas/espece-schemas";

import { revalidatePath } from "next/cache";

export const UpdateRetrait = async (
  values: z.infer<typeof RetraitSchema>,
  codeBoutique: string,
  id: string
) => {
  const validatedFields = RetraitSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("not valid");
    return { error: "Invalid fields!" };
  }

  values = { ...validatedFields.data };

  try {
    const current = await db.retrait.findUnique({
      where: {
        id: id,
      },
    });

    if (!current) {
      return { error: "retrait not found!" };
    }

    const vbank = await db.banks.findUnique({
      where: {
        CODB: values.codeBanque,
      },
      select: {
        ID: true,
        NOMB: true,
      },
    });

    if (!vbank) {
      return { error: "Code banque invalide!" };
    }

    await db.retrait.update({
      where: {
        id: id,
      },
      data: {
        dateRetrait: values.dateRetrait,
        bank: {
          connect: vbank,
        },
        num: values.num,
        montant: values.montant,
      },
    });

    revalidatePath(`/${codeBoutique}/gestionespece/retrait`);

    return { success: "Retrait modifié avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
