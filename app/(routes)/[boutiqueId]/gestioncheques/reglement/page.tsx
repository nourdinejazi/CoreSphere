import { PathSlash } from "@/components/path-slash";

import ReglementClient from "@/components/reglement-client";
import { Suspense } from "react";
import TableFallBack from "@/components/tableFallBack";

const ReglementChequePage = async ({
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
        <ReglementClient />
      </Suspense>
    </div>
  );
};

export default ReglementChequePage;
