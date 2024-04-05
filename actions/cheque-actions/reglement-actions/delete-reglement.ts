"use server";

import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";

export const DeleteReglement = async (
  codeBoutique: string,
  reglementId: string
) => {
  try {
    const reglement = await db.reglement.delete({
      where: {
        id: reglementId,
      },
    });

    const cheque = await db.cheque.findUnique({
      where: {
        id: reglement.chequeId,
      },
    });

    if (!cheque) {
      return { error: "Cheque not Found" };
    }

    await db.cheque.update({
      where: {
        id: cheque.id,
      },
      data: {
        statusPayement: false,
        payement: cheque.payement - reglement.montantPaye,
        restapaye: cheque.montant - (cheque.payement - reglement.montantPaye),
      },
    });

    revalidatePath(`/${codeBoutique}/gestioncheques/reglement`);

    return { success: "Réglement Supprimé avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
