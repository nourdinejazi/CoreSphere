"use server";

import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";

export const DeleteCheque = async (chequeId: string, codeBoutique: string) => {
  try {
    await db.cheque.delete({
      where: {
        id: chequeId,
      },
    });

    revalidatePath(`/${codeBoutique}/gestioncheques`);

    return { success: "Chèque Supprimé avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
