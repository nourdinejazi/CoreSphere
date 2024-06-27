import { db } from "@/lib/db";

import { Suspense } from "react";
import VersementEspForm from "../_components/versementesp-form";

const VersementEspFormPage = async ({
  params,
}: {
  params: { versementEspId: string };
}) => {
  const VersementEsp = await db.versementEsp.findUnique({
    where: {
      id: params.versementEspId,
    },
    include: {
      bank: true,
    },
  });

  const lastVersementEsp = await db.versementEsp.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      bank: true,
    },
    take: 10,
  });

  const formattedLastVersementEsp = lastVersementEsp?.map((r) => {
    const { bank, ...rest } = r;
    return {
      ...rest,
      codeBanque: r.bank.CODB,
    };
  });

  let formattedVersementEsp;
  if (VersementEsp) {
    const { bank, ...restVersementEsp } = { ...VersementEsp };
    formattedVersementEsp = {
      ...restVersementEsp,
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
        <VersementEspForm
          recentVersementEsps={formattedLastVersementEsp}
          lastVersementEsp={formattedLastVersementEsp[0]}
          initialData={formattedVersementEsp}
        />
      </Suspense>
    </div>
  );
};

export default VersementEspFormPage;
