import { db } from "@/lib/db";
import { PversementColumns } from "./pversement-columns";
import { DataTable } from "./pversement-data-table";
import Alerte from "@/components/alerte";

const PversementClient = async () => {
  const data = await db.cheque.findMany({
    where: {
      versementId: {
        not: null,
      },
    },
    select: {
      id: true,
      codeBanque: true,
      nche: true,
      lib: true,
      montant: true,
      date: true,
      type: true,
      dateBanque: true,
      versement: {
        select: {
          id: true,
          bank: true,
          num: true,
          dateVersement: true,
        },
      },
    },
  });

  const formattedData = data.map((obj) => ({
    id: obj.id,
    nche: obj.nche,
    lib: obj.lib,
    montant: obj.montant,
    codeBanque: obj.codeBanque,
    date: obj.date,
    type: obj.type,
    dateBanque: obj.dateBanque,
    banqueVersement: obj.versement!.bank.CODB,
    versementId: obj.versement!.id,
    num: obj.versement!.num,
    dateVersement: obj.versement!.dateVersement,
  }));

  return (
    <div>
      <Alerte />
      <DataTable data={formattedData} columns={PversementColumns} />{" "}
    </div>
  );
};

export default PversementClient;
