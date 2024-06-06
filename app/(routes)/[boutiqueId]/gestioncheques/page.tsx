import ClientListCheques from "@/app/(routes)/[boutiqueId]/gestioncheques/_components/client-liste-cheques";
import TableFallBack from "@/components/tableFallBack";
import { Suspense } from "react";

const GestionChequePage = async ({
  params,
}: {
  params: { boutiqueId: string };
}) => {
  return (
    <div>
      <Suspense fallback={<TableFallBack />}>
        <ClientListCheques params={params.boutiqueId} />
      </Suspense>
    </div>
  );
};

export default GestionChequePage;
