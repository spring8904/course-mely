'use client'

import { useAuthStore } from '@/stores/useAuthStore'
import {
  AudioWaveform,
  BadgeEuro,
  Book,
  ChartPie,
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
    avatar: 'https://github.com/shadcn.png',
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
      title: 'Thống kê',
      url: '/student',
      icon: ChartPie,
      isActive: true,
    },
    {
      title: 'Quản lý khoá học',
      url: '#',
      icon: Book,
      items: [
        {
          title: 'Khoá học của bạn',
          url: '/instructor/courses',
        },
        {
          title: 'Quản lý học viên',
          url: '#',
        },
        {
          title: 'Theo dõi tiến độ',
          url: '#',
        },
      ],
    },
    {
      title: 'Trò chuyện',
      url: '/instructor/chat',
      icon: UsersRound,
    },
    {
      title: 'Bài viết',
      url: '/instructor/posts',
      icon: MessageSquareText,
    },
    {
      title: 'Ví của bạn',
      url: '/instructor/wallet',
      icon: Wallet,
    },
    {
      title: 'Giao dịch của tôi',
      url: '/instructor/transaction',
      icon: BadgeEuro,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="mt-6 *:text-base">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user as any} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
