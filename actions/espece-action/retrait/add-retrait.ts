"use server";

import * as z from "zod";

import { db } from "@/lib/db";

import { RetraitSchema } from "@/schemas/espece-schemas";

import { revalidatePath } from "next/cache";

export const AddRetrait = async (
  values: z.infer<typeof RetraitSchema>,
  codeBoutique: string
) => {
  const validatedFields = RetraitSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("not valid");
    return { error: "Invalid fields!" };
  }

  values = { ...validatedFields.data };

  try {
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

    await db.retrait.create({
      data: {
        dateRetrait: values.dateRetrait,
        num: values.num,
        montant: values.montant,
        bank: {
          connect: vbank,
        },
      },
    });

    revalidatePath(`/${codeBoutique}/gestionespece/retrait`);

    return { success: "Retrait ajouté avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
