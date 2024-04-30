import { PathSlash } from "@/components/path-slash";

import { Suspense } from "react";
import PversementClient from "./_components/pversement-client";

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
      <Suspense
        fallback={
          <div className="w-full  flex items-center justify-center h-[70vh] ">
            <div className="fastLoader border-[4px] border-primary "></div>
          </div>
        }
      >
        <PversementClient />
      </Suspense>
    </div>
  );
};

export default PversementPage;
