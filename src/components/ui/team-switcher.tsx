'use client'

import * as React from 'react'
import { ChevronsUpDown, Plus } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import Image from 'next/image'

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/*<div*/}
              {/*  className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">*/}
              {/*  <activeTeam.logo className="size-4" />*/}
              {/*</div>*/}
              {/*<div className="grid flex-1 text-left text-sm leading-tight">*/}
              {/*  <span className="truncate font-semibold">*/}
              {/*    {activeTeam.name}*/}
              {/*  </span>*/}
              {/*  <span className="truncate text-xs">{activeTeam.plan}</span>*/}
              {/*</div>*/}
              <Image
                src="/images/Logo.png"
                alt="CourseHUB logo"
                width={40}
                height={40}
              />
              <h2 className="text-xl font-extrabold">CourseHUB</h2>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
