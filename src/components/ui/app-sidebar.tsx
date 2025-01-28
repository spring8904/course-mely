'use client'

import * as React from 'react'
import {
  AudioWaveform,
  BadgeEuro,
  Book,
  CirclePlay,
  Command,
  GalleryVerticalEnd,
  MessageSquareText,
  UsersRound,
  Wallet,
} from 'lucide-react'

import { NavMain } from '@/components/ui/nav-main'
import { NavUser } from '@/components/ui/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { TeamSwitcher } from '@/components/ui/team-switcher'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Khám phá',
      url: '/student',
      icon: CirclePlay,
      isActive: true,
    },
    {
      title: 'Khu vực học tập',
      url: '#',
      icon: Book,
      items: [
        {
          title: 'Khoá học của bạn',
          url: '#',
        },
        {
          title: 'Tiến độ học tập',
          url: '#',
        },
      ],
    },
    {
      title: 'Người hưỡng dẫn',
      url: '#',
      icon: UsersRound,
    },
    {
      title: 'Bài viết',
      url: '#',
      icon: MessageSquareText,
    },
    {
      title: 'Ví của bạn',
      url: '#',
      icon: Wallet,
    },
    {
      title: 'Giao dịch gần đây',
      url: '#',
      icon: BadgeEuro,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="mt-6 *:text-base">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
