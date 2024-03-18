"use client";

import { DataTable } from "@/app/(routes)/[boutiqueId]/_components/data-table";
import { ChequeColumns } from "@/app/(routes)/[boutiqueId]/_components/columns";
import { Cheque } from "@prisma/client";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";

interface chequeClientProps {
  data: Cheque[] | [];
}

const GestionChequeClient = ({ data }: chequeClientProps) => {
  const { setTheme } = useTheme();
  // const params = useParams();
  // setTheme(params.boutiqueId as string);
  return (
    <div>
      <DataTable data={data} columns={ChequeColumns} />
    </div>
  );
};

export default GestionChequeClient;
