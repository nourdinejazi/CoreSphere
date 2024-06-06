import { db } from "@/lib/db";
import { DataTable } from "../../_components/data-table";
import { ChequeColumns } from "../../_components/columns";
import { PathSlash } from "@/components/path-slash";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Alerte from "@/components/alerte";
const ClientListCheques = async ({ params }: { params: string }) => {
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
      <div className="  m-4  no-print flex items-center justify-between   ">
        <PathSlash />

        <Link href={`/${params}/gestioncheques/new`}>
          <Button>Ajouter un cheque</Button>
        </Link>
      </div>
      <DataTable data={data} columns={ChequeColumns} />
    </div>
  );
};

export default ClientListCheques;
