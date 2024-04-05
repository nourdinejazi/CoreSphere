import { DataTable } from "@/app/(routes)/[boutiqueId]/_components/data-table";
import { ChequeColumns } from "@/app/(routes)/[boutiqueId]/_components/columns";
import { Cheque } from "@prisma/client";
import { Suspense } from "react";
import Alerte from "./alerte";
import { db } from "@/lib/db";

const GestionChequeClient = async () => {
  const data = await db.cheque.findMany({
    where: {
      statusPayement: false,
    },
  });

  return (
    <div>
      <Alerte />
      <DataTable data={data} columns={ChequeColumns} />
    </div>
  );
};

export default GestionChequeClient;
