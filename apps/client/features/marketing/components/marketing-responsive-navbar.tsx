import Link from "next/link";
import { Button } from "@/components/atoms/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/atoms/sheet";
import ClaraWordmark from "@/components/molecules/clara-wordmark";
import { NavbarItemsType } from "./marketing-navbar";
import { Separator } from "@/components/atoms/separator";
import { Menu, X } from "lucide-react";

export default function MarketingResponsiveNavbar({
  navbarItems,
}: {
  navbarItems: NavbarItemsType[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" type="button" className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="gap-0">
        <SheetHeader>
          <div className="flex justify-between items-center w-full">
            <SheetTitle>
              <ClaraWordmark width={40} height={40} fontSize="text-xl" />
            </SheetTitle>
            <SheetDescription className="sr-only">
              Navigation menu to access main pages, features, and other site
              information.
            </SheetDescription>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" type="button">
                <X />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        <Separator className="mb-4" />
        <ul className="flex flex-col gap-3 px-2">
          {navbarItems.map((item) => (
            <li key={item.title}>
              <Button
                variant="ghost"
                type="button"
                className="justify-start w-full"
              >
                {item.title}
              </Button>
            </li>
          ))}
        </ul>
        <SheetFooter>
          <Button asChild type="button" className="w-full">
            <Link href="/auth">Log in</Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
