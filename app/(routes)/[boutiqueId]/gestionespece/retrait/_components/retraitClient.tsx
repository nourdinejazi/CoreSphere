import Alerte from "@/components/alerte";
import { db } from "@/lib/db";
import { DataTable } from "./retrait-data-table";
import { RetraitColumns } from "./retrait-columns";
const RetraitClient = async () => {
  const data = await db.retrait.findMany({
    include: {
      bank: true,
    },
  });

  const formattedData = data.map((item) => {
    return {
      ...item,
      banqueVersement: item.bank.CODB,
    };
  });

  return (
    <div className="k">
      <Alerte />
      <DataTable data={formattedData} columns={RetraitColumns} />
    </div>
  );
};

export default RetraitClient;
