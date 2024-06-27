"use server";

import * as z from "zod";

import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";
import { VersementEspSchema } from "@/schemas/espece-schemas";

export const UpdateVersementEsp = async (
  values: z.infer<typeof VersementEspSchema>,
  codeBoutique: string,
  id: string
) => {
  const validatedFields = VersementEspSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("not valid");
    return { error: "Invalid fields!" };
  }

  values = { ...validatedFields.data };

  try {
    const current = await db.versementEsp.findUnique({
      where: {
        id: id,
      },
    });

    if (!current) {
      return { error: "versement espéce not found!" };
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

    await db.versementEsp.update({
      where: {
        id: id,
      },
      data: {
        dateVersmentEsp: values.dateVersementEsp,
        bank: {
          connect: vbank,
        },
        num: values.num,
        montant: values.montant,
      },
    });

    revalidatePath(`/${codeBoutique}/gestionespece/versementesp`);

    return { success: "versement espéce modifié avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
