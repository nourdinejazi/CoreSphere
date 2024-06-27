import { db } from "@/lib/db";

import { Suspense } from "react";
import RetraitForm from "../_components/retrait-form";

const retraitFormPage = async ({
  params,
}: {
  params: { retraitId: string };
}) => {
  const retrait = await db.retrait.findUnique({
    where: {
      id: params.retraitId,
    },
    include: {
      bank: true,
    },
  });

  const lastretrait = await db.retrait.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      bank: true,
    },
    take: 10,
  });

  const formattedLastRetrait = lastretrait?.map((r) => {
    const { bank, ...rest } = r;
    return {
      ...rest,
      codeBanque: r.bank.CODB,
    };
  });

  let formattedRetrait;
  if (retrait) {
    const { bank, ...restRetrait } = { ...retrait };
    formattedRetrait = {
      ...restRetrait,
      codeBanque: bank?.CODB,
    };
  }
  return (
    <div>
      <Suspense
        fallback={
          <div className="w-full  flex items-center justify-center h-[70vh] ">
            <div className="fastLoader border-[4px] border-primary "></div>
          </div>
        }
      >
        <RetraitForm
          recentRetraits={formattedLastRetrait}
          lastRetrait={formattedLastRetrait[0]}
          initialData={formattedRetrait}
        />
      </Suspense>
    </div>
  );
};

export default retraitFormPage;
