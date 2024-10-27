import { headerLogo } from "@/assets/images";
import { hamburger } from "@/assets/icons";
import { navLinks } from "@/assets/constants/index.js";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Nav = () => {
  return (
    <header className="padding-x py-8 absolute z-10 w-full">
      <nav className="flex justify-between items-center max-container">
        <Link href="/">
          <h3 className="text-xl">Mo' Adunni Empire</h3>
        </Link>
        <ul className="flex-1 flex justify-center items-center gap-28 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="font-montserrat leading-normal text-lg text-slate-400"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden max-lg:block cursor-pointer">
          <SheetDemo />
        </div>
      </nav>
    </header>
  );
};

export default Nav;

function SheetDemo() {
  return (
    <Sheet className="bg-white z-50">
      <SheetTrigger asChild>
        <Image src={hamburger} alt="Hamburger" width={25} height={25} />
      </SheetTrigger>
      <SheetContent side="right" className="w-1/2 flex flex-col items-start px-6 py-4 bg-white justify-center">
        <ul className="flex flex-col gap-4 h-full justify-center space-y-10">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="font-montserrat leading-normal text-lg text-slate-400"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
