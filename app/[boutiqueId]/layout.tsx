import { db } from "@/lib/db";
interface CampaignsLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default async function CampaignsLayout({
  children,
  modal,
}: CampaignsLayoutProps) {
  return (
    <div className="w-full    flex flex-col    h-full">
      {modal}
      {children}
    </div>
  );
}
