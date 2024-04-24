import { DataTable } from "@/app/(routes)/[boutiqueId]/_components/data-table";
import { ChequeColumns } from "@/app/(routes)/[boutiqueId]/_components/columns";

import Alerte from "./alerte";
import { db } from "@/lib/db";

const GestionChequeClient = async () => {
  const data = await db.cheque.findMany({
    where: {
      statusPayement: false,
      OR: [
        {
          type: {
            equals: null,
          },
        },
        {
          type: {
            not: "V_C",
          },
        },
      ],
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
