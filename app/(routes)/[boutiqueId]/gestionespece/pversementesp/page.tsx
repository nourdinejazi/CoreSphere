import { PathSlash } from "@/components/path-slash";

import { Suspense } from "react";
import TableFallBack from "@/components/tableFallBack";
import PversementespClient from "./_components/pversementesp-client";

const PversementespPage = async ({
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
        <PversementespClient />
      </Suspense>
    </div>
  );
};

export default PversementespPage;
