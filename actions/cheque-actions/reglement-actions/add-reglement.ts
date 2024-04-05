"use server";

import * as z from "zod";

import { db } from "@/lib/db";

import { reglementSchema } from "@/schemas/cheque-schemas";

import { revalidatePath } from "next/cache";

export const AddReglement = async (
  values: z.infer<typeof reglementSchema>,
  chequeId: string,
  codeBoutique: string
) => {
  const validatedFields = reglementSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("not valid");
    return { error: "Invalid fields!" };
  }

  const cheque = await db.cheque.findUnique({
    where: {
      id: chequeId,
    },
  });

  if (!cheque) {
    return { error: "Cheque non trouvé!" };
  }

  if (values.montantPaye + cheque.payement > cheque.montant) {
    return { error: "Montant payé supérieur au montant du chèque!" };
  }

  values = { ...validatedFields.data };

  try {
    if (cheque.montant === values.montantPaye + cheque.payement) {
      await db.cheque.update({
        where: {
          id: chequeId,
        },
        data: {
          statusPayement: true,
        },
      });
    }

    await db.reglement.create({
      data: {
        method: values.method,
        montantPaye: values.montantPaye,
        dateReglement: values.dateReglement,
        cheque: {
          connect: {
            id: chequeId,
          },
        },
      },
    });

    await db.cheque.update({
      where: {
        id: chequeId,
      },
      data: {
        payement: cheque.payement + values.montantPaye,
        restapaye: cheque.montant - (cheque.payement + values.montantPaye),
      },
    });

    revalidatePath(`/${codeBoutique}/gestioncheques/new`);

    return { success: "Chèque ajouté avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
