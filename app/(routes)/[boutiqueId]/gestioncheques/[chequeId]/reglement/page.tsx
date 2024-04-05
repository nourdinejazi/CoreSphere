import { db } from "@/lib/db";

import { Suspense } from "react";
import ReglementForm from "../_components/reglement-form";

const ReglementFormPage = async ({
  params,
}: {
  params: { chequeId: string };
}) => {
  const cheque = await db.cheque.findUnique({
    where: {
      id: params.chequeId,
    },
  });

  const lastReglement = await db.reglement.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      cheque: true,
    },
    where: {
      cheque: {
        id: params.chequeId,
      },
    },
  });

  return (
    <div>
      <Suspense
        fallback={
          <div className="w-full  flex items-center justify-center h-[70vh] ">
            <div className="fastLoader border-[4px] border-primary "></div>
          </div>
        }
      >
        <ReglementForm
          recentReglements={lastReglement}
          chequeReglement={cheque}
        />
      </Suspense>
    </div>
  );
};

export default ReglementFormPage;
