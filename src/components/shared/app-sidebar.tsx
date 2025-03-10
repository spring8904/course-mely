'use client'

import { useAuthStore } from '@/stores/useAuthStore'
import {
  AudioWaveform,
  BadgeEuro,
  Book,
  ChartPie,
  Command,
  Database,
  GalleryVerticalEnd,
  MessageSquareQuote,
  MessageSquareText,
  TicketPercent,
  UsersRound,
  Wallet,
} from 'lucide-react'
import Image from 'next/image'

import { NavMain } from '@/components/shared/nav-main'
import { NavUser } from '@/components/shared/nav-user'
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
import Link from 'next/link'

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
          url: '/instructor/learner-manage',
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
      title: 'Đánh giá',
      url: '/instructor/evaluation',
      icon: MessageSquareQuote,
    },
    {
      title: 'Mã giảm giá',
      url: '/instructor/coupon',
      icon: TicketPercent,
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
            <SidebarMenuButton size="lg" className="hover:bg-inherit" asChild>
              <Link href="/instructor">
                <div className="flex aspect-square size-8 rounded-lg">
                  <Image
                    src="/images/Logo.png"
                    alt="CourseMeLy logo"
                    width={32}
                    height={32}
                  />
                </div>
                <span className="truncate text-lg font-extrabold">
                  CourseMeLy
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user as any} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
