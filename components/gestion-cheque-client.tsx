"use client";

import { DataTable } from "@/app/[boutiqueId]/_components/data-table";
import { ChequeColumns } from "@/app/[boutiqueId]/_components/columns";
import { Cheque } from "@prisma/client";

interface chequeClientProps {
  data: Cheque[] | [];
}

const GestionChequeClient = ({ data }: chequeClientProps) => {
  return (
    <div>
      <DataTable data={data} columns={ChequeColumns} />
    </div>
  );
};

export default GestionChequeClient;
