import { Home, DollarSign, CircleHelp, UserRoundPen, Link, LogIn} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import SiteTitle from "@/components/SiteFullTitle/SiteTitle/sitetitle"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Pricing",
    url: "/pricing",
    icon: DollarSign
  },
  {
    title: "URL Intentifier",
    url: "/intentifier",
    icon: Link,
  },
  {
    title: "Sign in",
    url: "/login",
    icon: LogIn,
  },
  {
    title: "Register",
    url: "/register",
    icon: UserRoundPen,
  },
  {
    title: "About us",
    url: "/about",
    icon: CircleHelp,
  }
]

export function GuestSidebar() {

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
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
