"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const DeleteRetrait = async (
  retraitId: string,
  codeBoutique: string
) => {
  try {
    const retrait = await db.retrait.findUnique({
      where: {
        id: retraitId,
      },
    });
    console.log("éaaaa", retrait);

    if (!retrait) {
      return { error: "Retrait not Found" };
    }

    await db.retrait.delete({
      where: {
        id: retraitId,
      },
    });

    revalidatePath(`/${codeBoutique}/gestionespece/retrait`);

    return { success: "Retrait Supprimé avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
