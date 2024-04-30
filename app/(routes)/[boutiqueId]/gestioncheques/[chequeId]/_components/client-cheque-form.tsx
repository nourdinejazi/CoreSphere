import { ResisableClient } from "@/components/resisable-client";
import { db } from "@/lib/db";
import ChequeForm from "./cheque-form";

const ClientListCheques = async ({ params }: { params: string }) => {
  const cheque = await db.cheque.findUnique({
    where: {
      id: params,
    },
  });

  const lastCheque = await db.cheque.findMany({
    orderBy: {
      id: "desc",
    },
    take: 10,
  });

  return (
    <ResisableClient
      defaultLayout={undefined}
      defaultCollapsed={true}
      navCollapsedSize={4}
    >
      <ChequeForm
        recentCheques={lastCheque}
        lastCheque={lastCheque[0]}
        initialData={cheque}
      />
    </ResisableClient>
  );
};

export default ClientListCheques;
