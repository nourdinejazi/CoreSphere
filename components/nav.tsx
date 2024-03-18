import { NavCombo } from "./nav-combo";
import MainNav from "./main-nav";
import SecondaryMainNav from "./secondary-main-nav";
import { UserButton } from "./auth/user-button";
import { Separator } from "./ui/separator";

const Nav = () => {
  return (
    <div className="w-full bg-white shadow-md rounded-b-xl">
      <div className="w-full h-[70px] flex items-center justify-start gap-8 px-8  ">
        <MainNav />
      </div>
      <Separator />
      <div className="">
        <div className="w-full h-[70px] flex items-center justify-start gap-8 px-8 ">
          <NavCombo />
          <SecondaryMainNav />

          <div className="flex-grow "></div>
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Nav;
