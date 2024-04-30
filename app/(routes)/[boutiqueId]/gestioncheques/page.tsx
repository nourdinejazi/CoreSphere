import ClientListCheques from "@/app/(routes)/[boutiqueId]/gestioncheques/_components/client-liste-cheques";
import { Suspense } from "react";

const GestionChequePage = async ({
  params,
}: {
  params: { boutiqueId: string };
}) => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="w-full  flex items-center justify-center h-[70vh] ">
            <div className="fastLoader border-[4px] border-primary "></div>
          </div>
        }
      >
        <ClientListCheques params={params.boutiqueId} />
      </Suspense>
    </div>
  );
};

export default GestionChequePage;
