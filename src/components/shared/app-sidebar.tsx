'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAuthStore } from '@/stores/useAuthStore'
import {
  AudioWaveform,
  BadgeEuro,
  Book,
  ChartPie,
  Command,
  Database,
  GalleryVerticalEnd,
  MessageSquareText,
  UsersRound,
  Wallet,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavMain } from '@/components/shared/nav-main'
import { NavUser } from '@/components/shared/nav-user'

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
      url: '/instructor',
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
      title: 'Lịch sử mua',
      url: '/instructor/transaction',
      icon: BadgeEuro,
    },
    {
      title: 'Giao dịch của tôi',
      url: '/instructor/with-draw-request',
      icon: Database,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Image
                  src="/images/Logo.png"
                  alt="CourseMeLy logo"
                  width={40}
                  height={40}
                />
                <h2 className="text-xl font-extrabold">CourseMeLy</h2>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
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
