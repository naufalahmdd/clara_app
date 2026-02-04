import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../atoms/sidebar";
import ClaraWordmark from "../molecules/clara-wordmark";
import WorkspaceSwitcher from "../organisms/workspace-switcher";
import AppSidebarFooter from "../organisms/app-sidebar-footer";
import {
  ClipboardCheck,
  Clock,
  FolderOpen,
  LayoutDashboard,
  Settings,
  UsersRound,
} from "lucide-react";

const data = {
  navItemOwner: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Projects",
      href: "/projects",
      icon: FolderOpen,
    },
    {
      title: "Tasks",
      href: "/tasks",
      icon: ClipboardCheck,
    },
    {
      title: "Time tracking",
      href: "/time-tracking",
      icon: Clock,
    },
    {
      title: "Team",
      href: "/team",
      icon: UsersRound,
    },
    {
      title: "Workspace settings",
      href: "/workspace-settings",
      icon: Settings,
    },
  ],
};

export default function AppSidebar() {
  
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu className="gap-6">
          <SidebarMenuItem>
            <ClaraWordmark
              href="/dashboard"
              width={43}
              height={43}
              fontSize="text-xl"
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <WorkspaceSwitcher />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navItemOwner.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.href}>
                    <item.icon /> {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
