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
      <h1 className={cn("text-3xl font-semibold", font.className)}>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Image src="/chich.png" alt="Logo" width={150} height={150} />
          <Image src="/chich2.png" alt="Logo" width={70} height={70} />
        </div>
      </h1>
      <p className="text-muted-foreground text-sm">Bienvenue</p>
    </div>
  );
};
