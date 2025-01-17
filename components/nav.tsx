import { UserButton } from "./auth/user-button";
import MainNav from "./main-nav";
import { Separator } from "./ui/separator";
import Image from "next/image";
import Link from "next/link";
const Nav = () => {
  return (
    <div className="w-full no-print bg-white  ">
      <div className="w-full h-[70px] flex items-center justify-start gap-8 p-12 ">
        <Link href={"/"}>
          <div className="flex flex-col gap-2 items-center justify-center  ">
            <Image
              src="/chich.png"
              alt="Logo"
              width={150}
              priority
              height={20}
            />
            <Image
              src="/chich2.png"
              alt="Logo"
              priority
              width={70}
              height={20}
            />
          </div>
        </Link>
        <MainNav />
        <div className="flex-grow "></div>
        <UserButton />
      </div>
      <Separator />
    </div>
  );
};

export default Nav;
