import LoadingPage from "@/app/loading";

import { PathSlash } from "@/components/path-slash";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";

import dynamic from "next/dynamic";
import Image from "next/image";
const GestionChequePage = async ({
  params,
}: {
  params: { boutiqueId: string };
}) => {
  const DynamicGestionChequeClient = dynamic(
    () => import("@/components/gestion-cheque-client"),
    {
      loading: () => <LoadingPage className="h-[40vw]" />,
    }
  );

  const data = await db.cheque.findMany();

  return (
    <div>
      <div className="p-5  flex items-center justify-between ">
        <PathSlash />

        <Link href={`/${params.boutiqueId}/gestioncheques/new`}>
          <Button>Ajouter un cheque</Button>
        </Link>
      </div>
      <DynamicGestionChequeClient data={data} />
    </div>
  );
};

export default GestionChequePage;
