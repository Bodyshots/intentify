import { Home, Settings, CircleHelp, UserRound, Link} from "lucide-react"
import { useEffect, useState } from "react"
import './appsidebar.css';

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

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Your Account",
    url: "/account",
    icon: UserRound,
  },
  {
    title: "URL Intentifier",
    url: "/intentifier",
    icon: Link,
  },
  {
    title: "About us",
    url: "/about",
    icon: CircleHelp,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  // const [isAuth, setIsAuth] = useState(false);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const res = await fetch("")
  //   }
  // })

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
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
