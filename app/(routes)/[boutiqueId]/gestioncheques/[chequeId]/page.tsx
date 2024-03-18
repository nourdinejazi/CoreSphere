import { db } from "@/lib/db";
import ChequeForm from "./_components/cheque-form";
import { Suspense } from "react";
import LoadingPage from "@/app/loading";

const ChequeFormPage = async ({ params }: { params: { chequeId: string } }) => {
  const cheque = await db.cheque.findUnique({
    where: {
      id: params.chequeId,
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
        <ChequeForm initialData={cheque} />
      </Suspense>
    </div>
  );
};

export default ChequeFormPage;
