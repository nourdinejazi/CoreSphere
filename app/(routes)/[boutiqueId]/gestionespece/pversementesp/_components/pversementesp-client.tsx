import { db } from "@/lib/db";
import { DataTable } from "./pversementesp-data-table";
import Alerte from "@/components/alerte";
import { PversementespColumns } from "./pversementesp-columns";

const PversementespClient = async () => {
  const data = await db.versementEsp.findMany({
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
      <DataTable data={formattedData} columns={PversementespColumns} />
    </div>
  );
};

export default PversementespClient;
