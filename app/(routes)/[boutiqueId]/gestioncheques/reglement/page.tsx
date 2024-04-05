import { PathSlash } from "@/components/path-slash";

import { db } from "@/lib/db";
import { Cheque, Reglement } from "@prisma/client";

import ReglementClient from "@/components/reglement-client";
import { Suspense } from "react";

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
      <Suspense
        fallback={
          <div className="w-full  flex items-center justify-center h-[70vh] ">
            <div className="fastLoader border-[4px] border-primary "></div>
          </div>
        }
      >
        <ReglementClient />
      </Suspense>
    </div>
  );
};

export default ReglementChequePage;
