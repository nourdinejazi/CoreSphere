import { db } from "@/lib/db";
import { DataTable } from "./pretrait-data-table";
import Alerte from "@/components/alerte";
import { PretraitColumns } from "./pretrait-columns";

const PretaitClient = async () => {
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
    <div>
      <Alerte />
      <DataTable data={formattedData} columns={PretraitColumns} />
    </div>
  );
};

export default PretaitClient;
