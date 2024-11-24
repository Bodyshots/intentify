import { Home, CircleHelp, UserRoundCog, LogOut, List, Mail} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import SiteTitle from "@/components/SiteFullTitle/SiteTitle/sitetitle"
import Link from "next/link"
import { ModeToggle } from "../ModeToggle/modetoggle"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Your Conversations",
    url: "/conversations",
    icon: List,
  },
  {
    title: "Account Settings",
    url: "/settings",
    icon: UserRoundCog,
  },
  {
    title: "Feedback",
    url: "/feedback",
    icon: Mail
  },
  {
    title: "About Us",
    url: "/about",
    icon: CircleHelp,
  },
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  },
]

export function AuthSidebar() {

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg text-foreground justify-center flex"><SiteTitle/></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle/>
      </SidebarFooter>
    </Sidebar>
  )
}
