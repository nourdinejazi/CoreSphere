import { PathSlash } from "@/components/path-slash";
import { Button } from "@/components/ui/button";

import Link from "next/link";

import { Suspense } from "react";
import VersementClient from "./_components/versementClient";
import TableFallBack from "@/components/tableFallBack";

const VersementPage = async ({
  params,
}: {
  params: { boutiqueId: string };
}) => {
  return (
    <div>
      <div className="p-5   no-print flex items-center justify-between ">
        <PathSlash />

        <Link href={`/${params.boutiqueId}/gestioncheques/versement/new`}>
          <Button>Ajouter un Versement</Button>
        </Link>
      </div>
      <Suspense fallback={<TableFallBack />}>
        <VersementClient />
      </Suspense>
    </div>
  );
};

export default VersementPage;
