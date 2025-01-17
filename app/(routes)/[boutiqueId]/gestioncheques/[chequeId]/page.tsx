import { db } from "@/lib/db";
import ChequeForm from "./_components/cheque-form";
import { Suspense } from "react";

const ChequeFormPage = async ({ params }: { params: { chequeId: string } }) => {
  const cheque = await db.cheque.findUnique({
    where: {
      id: params.chequeId,
    },
  });

  const lastCheque = await db.cheque.findMany({
    orderBy: {
      id: "desc",
    },
    take: 10,
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
        <ChequeForm
          recentCheques={lastCheque}
          lastCheque={lastCheque[0]}
          initialData={cheque}
        />
      </Suspense>
    </div>
  );
};

export default ChequeFormPage;
