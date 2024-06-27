import { PathSlash } from "@/components/path-slash";
import { Button } from "@/components/ui/button";

import Link from "next/link";

import { Suspense } from "react";
import RetraitClient from "./_components/retraitClient";
import TableFallBack from "@/components/tableFallBack";

const RetraitPage = async ({ params }: { params: { boutiqueId: string } }) => {
  return (
    <div>
      <div className="p-5   no-print flex items-center justify-between ">
        <PathSlash />

        <Link href={`/${params.boutiqueId}/gestionespece/retrait/new`}>
          <Button>Ajouter un Retrait</Button>
        </Link>
      </div>
      <Suspense fallback={<TableFallBack />}>
        <RetraitClient />
      </Suspense>
    </div>
  );
};

export default RetraitPage;
