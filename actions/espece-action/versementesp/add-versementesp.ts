"use server";

import * as z from "zod";

import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";
import { VersementEspSchema } from "@/schemas/espece-schemas";

export const AddVersementEsp = async (
  values: z.infer<typeof VersementEspSchema>,
  codeBoutique: string
) => {
  const validatedFields = VersementEspSchema.safeParse(values);

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

    await db.versementEsp.create({
      data: {
        dateVersmentEsp: values.dateVersementEsp,
        num: values.num,
        montant: values.montant,
        bank: {
          connect: vbank,
        },
      },
    });

    revalidatePath(`/${codeBoutique}/gestionespece/versementesp`);

    return { success: "versement espéce ajouté avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
