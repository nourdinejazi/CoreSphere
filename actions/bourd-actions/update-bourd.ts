"use server";

import * as z from "zod";

import { db } from "@/lib/db";

import { versementSchema } from "@/schemas/cheque-schemas";

import { revalidatePath } from "next/cache";

export const UpdateBourd = async (
  values: z.infer<typeof versementSchema>,
  codeBoutique: string,
  id: string
) => {
  const validatedFields = versementSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("not valid");
    return { error: "Invalid fields!" };
  }

  values = { ...validatedFields.data };

  try {
    const current = await db.versement.findUnique({
      where: {
        id: id,
      },
      include: {
        cheque: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!current) {
      return { error: "Versement not found!" };
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

    await db.versement.update({
      where: {
        id: id,
      },
      data: {
        dateVersement: values.dateVersement,
        bank: {
          connect: vbank,
        },
        num: values.num,
        cheque: {
          disconnect: current.cheque,
        },
      },
    });

    await db.versement.update({
      where: {
        id: id,
      },
      data: {
        cheque: {
          connect: values.cheque.map((id) => ({ id: id })),
        },
      },
    });

    const currentCheques: string[] = current.cheque.map((cheque) => cheque.id);
    const valuesCheques: string[] = values.cheque.map((cheque) => cheque.id);
    const removedCheques = currentCheques.filter(
      (cheque) => !valuesCheques.includes(cheque)
    );

    await db.cheque.updateMany({
      where: {
        id: {
          in: removedCheques,
        },
      },
      data: {
        type: "GAR",
      },
    });

    revalidatePath(`/${codeBoutique}/gestioncheques/versement`);

    return { success: "Vérsement modifié avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
