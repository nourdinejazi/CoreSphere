import { PathSlash } from "@/components/path-slash";

import { Suspense } from "react";
import PversementClient from "./_components/pversement-client";
import TableFallBack from "@/components/tableFallBack";

const PversementPage = async ({
  params,
}: {
  params: { boutiqueId: string };
}) => {
  return (
    <div>
      <div className="p-5 print:hidden flex items-center justify-between ">
        <PathSlash />
      </div>
      <Suspense fallback={<TableFallBack />}>
        <PversementClient />
      </Suspense>
    </div>
  );
};

export default PversementPage;
