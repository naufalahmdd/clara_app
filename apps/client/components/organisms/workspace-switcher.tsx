import { CheckCircle, MoreVertical, PlusCircle, Settings } from "lucide-react";
import { Button } from "../atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../atoms/dropdown-menu";

export default function WorkspaceSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" type="button" className="w-full justify-between">
          Acme Inc. <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground text-xs mb-2">
            Switch workspace
          </DropdownMenuLabel>
          <DropdownMenuItem className="w-full justify-between cursor-pointer">
            Acme Inc. <CheckCircle className="text-green-500" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-3" />
        <DropdownMenuGroup>
          <Button size="sm" type="button" className="w-full mb-2.5">
            <PlusCircle /> Create workspace
          </Button>
          <Button variant="outline" size="sm" type="button" className="w-full">
            <Settings /> Manage workspace
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
