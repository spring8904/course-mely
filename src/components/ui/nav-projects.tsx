'use client'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { type LucideIcon } from 'lucide-react'

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        {/*<SidebarMenuItem>*/}
        {/*  <SidebarMenuButton className="text-sidebar-foreground/70">*/}
        {/*    <MoreHorizontal className="text-sidebar-foreground/70" />*/}
        {/*    <span>More</span>*/}
        {/*  </SidebarMenuButton>*/}
        {/*</SidebarMenuItem>*/}
      </SidebarMenu>
    </SidebarGroup>
  )
}
