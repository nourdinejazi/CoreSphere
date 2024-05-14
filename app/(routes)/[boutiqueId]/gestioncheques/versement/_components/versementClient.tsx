import Alerte from "@/components/alerte";
import { db } from "@/lib/db";
import { DataTable } from "./versement-data-table";
import { VersementColumns } from "./versement-columns";

const VersementClient = async () => {
  const data = await db.versement.findMany({
    include: {
      cheque: true,
      bank: true,
    },
  });

  return (
    <div className="k">
      <Alerte />
      <DataTable data={data} columns={VersementColumns} />
    </div>
  );
};

export default VersementClient;
