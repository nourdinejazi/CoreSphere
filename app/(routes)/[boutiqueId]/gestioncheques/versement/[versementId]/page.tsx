import { db } from "@/lib/db";
import { Suspense } from "react";
import VersementForm from "../_components/versement-form";

const ChequeFormPage = async ({
  params,
}: {
  params: { versementId: string };
}) => {
  const initialData = await db.versement.findUnique({
    where: {
      id: params.versementId,
    },
    include: {
      cheque: true,
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
        <VersementForm initialData={initialData} />
      </Suspense>
    </div>
  );
};

export default ChequeFormPage;
