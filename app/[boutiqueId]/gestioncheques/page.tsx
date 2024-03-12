import GestionChequeClient from "@/components/gestion-cheque-client";
import { PathSlash } from "@/components/path-slash";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";

const GestionChequePage = async ({
  params,
}: {
  params: { boutiqueId: string };
}) => {
  const data = await db.cheque.findMany();
  return (
    <div>
      <div className="p-5  flex items-center justify-between ">
        <PathSlash />
        <Link href={`/${params.boutiqueId}/gestioncheques/new`}>
          <Button>Ajouter un cheque</Button>
        </Link>
      </div>

      <GestionChequeClient data={data} />
    </div>
  );
};

export default GestionChequePage;
