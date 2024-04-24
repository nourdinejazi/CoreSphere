"use server";
import { db } from "@/lib/db";

export const checkNche = async (nche: string) => {
  const cheque = await db.cheque.findFirst({
    where: {
      nche: nche,
    },
  });
  return cheque ? true : false;
};
