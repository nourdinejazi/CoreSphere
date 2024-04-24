"use server";

import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";

export const DeleteBourd = async (id: string, codeBoutique: string) => {
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

    await db.versement.delete({
      where: {
        id: id,
      },
    });

    await db.cheque.updateMany({
      where: {
        id: {
          in: current.cheque.map((cheque) => cheque.id),
        },
      },
      data: {
        type: "GAR",
      },
    });

    revalidatePath(`/${codeBoutique}/gestioncheques/versement`);

    return { success: "Vérsement supprimé avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
