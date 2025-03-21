'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAuthStore } from '@/stores/useAuthStore'
import { Bell, CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

import echo from '@/lib/echo'
import { cn } from '@/lib/utils'
import {
  useGetNotifications,
  useMarkAsRead,
} from '@/hooks/notification/useNotification'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import InputSearch from '@/components/common/InputSearch'
import { useQueryClient } from '@tanstack/react-query'
import QUERY_KEY from '@/constants/query-key'

const TopBar = () => {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()

  const [searchTerm, setSearchTerm] = useState('')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetNotifications()
  const { mutate: markAsRead } = useMarkAsRead()
  const notifications = data?.pages.flatMap((page) => page.notifications) || []

  // console.log('Active Channels:', echo.connector.channels)

  useEffect(() => {
    if (!user?.id) return

    const privateChannel = echo.private(`instructor.${user?.id}`)

    privateChannel.notification((notification: any) => {
      // console.log('🔔 Notification for Instructor:', notification)
      toast.info(notification.message)

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USER_NOTIFICATION],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_WITH_DRAW_REQUEST],
      })
    })

    return () => {
      // privateChannel.stopListening('.notification')
      echo.leave(`instructor.${user.id}`)
    }
  }, [queryClient, user?.id])

  const handleMarkAsRead = (id: string) => {
    markAsRead(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.USER_NOTIFICATION],
        })
      },
    })
  }

  const filteredNotifications = notifications
    .filter((noti: any) =>
      noti?.data?.message?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5)

  const hasUnread = notifications.some((n) => !n.read_at)

  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h3 className="font-medium">Xin chào, {user?.name || 'Người dùng'}</h3>
      </div>
      <div className="flex items-center space-x-4">
        <InputSearch />
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full shadow [&_svg]:size-5"
              >
                <Bell className={cn(hasUnread && 'animate-bell')} />
              </Button>
              {hasUnread && (
                <span className="absolute -right-0.5 -top-1 flex size-3">
                  <span className="absolute size-full animate-ping rounded-full bg-red-400/75"></span>
                  <span className="relative size-3 rounded-full bg-red-500"></span>
                </span>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            side="bottom"
            className="w-100 mr-6 p-2"
          >
            <div className="flex justify-between gap-2">
              <h4 className="text-sm font-medium">Thông báo</h4>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-60 rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Separator className="my-2" />
            {isLoading ? (
              <Loader2 />
            ) : filteredNotifications.length > 0 ? (
              <div className="flex w-full flex-col gap-3">
                {filteredNotifications.map((noti: any) => (
                  <div
                    key={noti.id}
                    className={`flex cursor-pointer items-center gap-4 rounded p-2 ${
                      noti.read_at ? 'bg-gray-100' : 'bg-blue-50'
                    }`}
                    onClick={() => handleMarkAsRead(noti.id)}
                  >
                    <div className="flex size-8 items-center justify-center rounded-full bg-gray-300">
                      {noti?.data.course_thumbnail ? (
                        <Image
                          src={noti?.data.course_thumbnail}
                          alt="thumbnail"
                          className="size-full rounded-full object-cover"
                          width={32}
                          height={32}
                        />
                      ) : (
                        <span className="text-sm font-bold text-white">
                          {noti?.data.sender?.charAt(0) ?? 'N'}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 items-center justify-between">
                      <span className="text-sm">{noti?.data.message}</span>
                      {!noti.read_at && (
                        <CheckCircle className="size-4 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}

                {hasNextPage && (
                  <button
                    className="mt-2 w-full text-center font-bold text-primary"
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                  >
                    {isFetchingNextPage ? 'Đang tải...' : 'Xem thêm'}
                  </button>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Không có thông báo mới</p>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}

export default TopBar
