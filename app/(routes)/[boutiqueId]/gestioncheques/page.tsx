import { PathSlash } from "@/components/path-slash";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";

import GestionChequeClient from "@/components/gestion-cheque-client";
import { Suspense } from "react";
import LoadingPage from "@/app/loading";

const GestionChequePage = async ({
  params,
}: {
  params: { boutiqueId: string };
}) => {
  return (
    <div>
      <div className="p-5   no-print flex items-center justify-between ">
        <PathSlash />

        <Link href={`/${params.boutiqueId}/gestioncheques/new`}>
          <Button>Ajouter un cheque</Button>
        </Link>
      </div>
      <Suspense
        fallback={
          <div className="w-full  flex items-center justify-center h-[70vh] ">
            <div className="fastLoader border-[4px] border-primary "></div>
          </div>
        }
      >
        <GestionChequeClient />
      </Suspense>
    </div>
  );
};

export default GestionChequePage;
