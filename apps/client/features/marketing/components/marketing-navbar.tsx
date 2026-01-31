import { Button } from "@/components/atoms/button";
import ClaraWordmark from "@/components/molecules/clara-wordmark";
import Link from "next/link";
import MarketingResponsiveNavbar from "./marketing-responsive-navbar";

export type NavbarItemsType = {
  title: string;
  scrollTo: string;
};

const navbarItems: NavbarItemsType[] = [
  {
    title: "Home",
    scrollTo: "#home",
  },
  {
    title: "Features",
    scrollTo: "#features",
  },
  {
    title: "Pricing",
    scrollTo: "#pricing",
  },
  {
    title: "Solutions",
    scrollTo: "#solutions",
  },
];

export default function MarketingNavbar() {
  return (
    <header className="flex justify-center items-center fixed top-0 left-0 w-full bg-background z-50 py-2 px-[7%] border-b border-border">
      <nav className="flex justify-between items-center w-full max-w-300">
        <MarketingResponsiveNavbar navbarItems={navbarItems} />

        <ClaraWordmark width={45} height={45} />

        <ul className="hidden lg:flex items-center gap-3">
          {navbarItems.map((item) => (
            <li key={item.title}>
              <Button variant="ghost" type="button">
                {item.title}
              </Button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <Button
            asChild
            variant="ghost"
            size="sm"
            type="button"
            className="hidden lg:inline-flex"
          >
            <Link href="/auth">Log in</Link>
          </Button>
          <Button asChild size="sm" type="button">
            <Link href="/auth">Sign in</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
