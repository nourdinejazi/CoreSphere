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
      <Suspense fallback={<LoadingPage />}>
        <ChequeForm initialData={cheque} />
      </Suspense>
    </div>
  );
};

export default ChequeFormPage;
