import { PathSlash } from "@/components/path-slash";

import { Suspense } from "react";
import TableFallBack from "@/components/tableFallBack";
import PretaitClient from "./_components/pretrait-client";

const PretraitPage = async ({ params }: { params: { boutiqueId: string } }) => {
  return (
    <div>
      <div className="p-5 print:hidden flex items-center justify-between ">
        <PathSlash />
      </div>
      <Suspense fallback={<TableFallBack />}>
        <PretaitClient />
      </Suspense>
    </div>
  );
};

export default PretraitPage;
