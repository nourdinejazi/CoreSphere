import { Poppins } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className="flex flex-col gap-2 items-center justify-center  ">
        <Image src="/chich.png" alt="Logo" width={150} priority height={20} />
        <Image src="/chich2.png" alt="Logo" priority width={70} height={20} />
      </div>
      <p className="text-muted-foreground text-sm">Bienvenue</p>
    </div>
  );
};
