import { Cheque, Reglement } from "@prisma/client";
import { ReglementColumns } from "@/app/(routes)/[boutiqueId]/gestioncheques/[chequeId]/_components/reglement-columns";
import { DataTable } from "@/app/(routes)/[boutiqueId]/gestioncheques/[chequeId]/_components/reglement-data-table";

import Alerte from "./alerte";
import { db } from "@/lib/db";

// interface ReglementClientProps {
//   data: Array<Reglement & { cheque: Cheque }>;
// }

const ReglementClient = async () => {
  
  const data: Array<Reglement & { cheque: Cheque }> =
    await db.reglement.findMany({
      include: {
        cheque: true,
      },
    });

  return (
    <div>
      <Alerte />
      <DataTable data={data} columns={ReglementColumns} />
    </div>
  );
};

export default ReglementClient;
