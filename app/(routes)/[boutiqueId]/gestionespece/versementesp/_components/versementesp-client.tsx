import Alerte from "@/components/alerte";
import { db } from "@/lib/db";
import { DataTable } from "./versementesp-data-table";
import { VersementEspColumns } from "./versementesp-columns";
const VersementEspClient = async () => {
  const data = await db.versementEsp.findMany({
    include: {
      bank: true,
    },
  });

  return (
    <div className="k">
      <Alerte />
      <DataTable data={data} columns={VersementEspColumns} />
    </div>
  );
};

export default VersementEspClient;
