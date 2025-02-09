'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isMobile } = useSidebar()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Link href="/">
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
            </Link>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
