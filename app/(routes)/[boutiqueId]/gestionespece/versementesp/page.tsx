import { PathSlash } from "@/components/path-slash";
import { Button } from "@/components/ui/button";

import Link from "next/link";

import { Suspense } from "react";
import TableFallBack from "@/components/tableFallBack";
import VersementEspClient from "./_components/versementesp-client";

const versementespPage = async ({
  params,
}: {
  params: { boutiqueId: string };
}) => {
  return (
    <div>
      <div className="p-5   no-print flex items-center justify-between ">
        <PathSlash />

        <Link href={`/${params.boutiqueId}/gestionespece/versementesp/new`}>
          <Button>Ajouter un Versement espéce</Button>
        </Link>
      </div>
      <Suspense fallback={<TableFallBack />}>
        <VersementEspClient />
      </Suspense>
    </div>
  );
};

export default versementespPage;
