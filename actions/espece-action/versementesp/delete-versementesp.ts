"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const DeleteVersementEsp = async (
  versementEspId: string,
  codeBoutique: string
) => {
  try {
    const versementEsp = await db.versementEsp.findUnique({
      where: {
        id: versementEspId,
      },
    });

    if (!versementEsp) {
      return { error: "Versement espéce not Found" };
    }

    await db.versementEsp.delete({
      where: {
        id: versementEspId,
      },
    });

    revalidatePath(`/${codeBoutique}/gestionespece/retrait`);

    return { success: "versement espéce Supprimé avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
