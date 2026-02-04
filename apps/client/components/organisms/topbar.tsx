import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../atoms/breadcrumb";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { Bell, Plus, Search } from "lucide-react";

export default function Topbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center w-full py-3.5 px-[3%] border-b border-border">
      <div className="flex items-center gap-10">
        {children}
        <Breadcrumb className="hidden lg:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Acme Inc.</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <form
        action=""
        className="relative hidden xl:flex items-center w-full max-w-sm xl:max-w-sm"
      >
        <div className="w-full">
          <Label htmlFor="dashboard-searchbar" className="sr-only">
            Search
          </Label>
          <Input
            type="text"
            name="dashboard-searchbar"
            id="dashboard-searchbar"
            placeholder="Search..."
            className="w-full"
          />
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          type="submit"
          className="absolute right-0.5"
        >
          <Search />
        </Button>
      </form>
      <div className="flex items-center gap-4">
        <Button size="sm" type="button">
          <Plus /> Create project
        </Button>
        <Button variant="ghost" type="button" className="xl:hidden">
          <Search />
        </Button>
        <Button variant="ghost" type="button">
          <Bell />
        </Button>
      </div>
    </div>
  );
}
