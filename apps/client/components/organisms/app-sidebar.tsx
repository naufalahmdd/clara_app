import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem } from "../atoms/sidebar";
import ClaraWordmark from "../molecules/clara-wordmark";

export default function AppSidebar() {
  return (
    <Sidebar>
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <ClaraWordmark width={35} height={35} fontSize="text-xl"/>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent></SidebarContent>
        <SidebarFooter></SidebarFooter>
    </Sidebar>
  )
}
