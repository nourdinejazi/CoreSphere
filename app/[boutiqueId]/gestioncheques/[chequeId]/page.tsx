import { db } from "@/lib/db";
import ChequeForm from "./_components/cheque-form";

const ChequeFormPage = async ({ params }: { params: { chequeId: string } }) => {
  const cheque = await db.cheque.findUnique({
    where: {
      id: params.chequeId,
    },
  });

  return (
    <div>
      <ChequeForm initialData={cheque} />
    </div>
  );
};

export default ChequeFormPage;
