"use server";

import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";

export const ImpVersement = async (id: string, codeBoutique: string) => {
  try {
    const cheque = await db.cheque.findUnique({
      where: {
        id: id,
      },
      include: {
        versement: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!cheque) {
      return { error: "Versement not found!" };
    }

    if (!cheque) {
      return { error: "Chéque non trouvé!" };
    }

    if (!cheque.versement) {
      return { error: "Chéque non versé!" };
    }

    await db.cheque.update({
      where: {
        id: id,
      },
      data: {
        versement: {
          disconnect: true,
        },
        type: "IMP",
      },
    });

    revalidatePath(`/${codeBoutique}/gestioncheques/pversement`);

    return { success: "Le chéque à était marqué comme impayé!" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
