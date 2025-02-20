'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import { Bell, CheckCircle } from 'lucide-react'
import Pusher from 'pusher-js'

import echo from '@/lib/echo'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import InputSearch from '@/components/common/InputSearch'

const TopBar = () => {
  const { user, token } = useAuthStore()
  const [notifications, setNotifications] = useState<
    { id: number; message: string; read: boolean }[]
  >([])

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: `${process.env.NEXT_PUBLIC_API_URL}broadcasting/auth`,
      auth: {
        headers: { Authorization: `Bearer ${token}` },
      },
    })

    const channel = echo.channel('notifications')

    console.log(channel)
    console.log('📡 Đang lắng nghe kênh:', channel.name)

    channel.listen('.NewNotification', (data: { message: string }) => {
      console.log('🔔 Nhận thông báo:', data)
      setNotifications((prev) => [
        ...prev,
        { id: Date.now(), message: data.message, read: false },
      ])
    })

    return () => {
      console.log('🛑 Dừng lắng nghe kênh:', channel.name)
      channel.stopListening('notifications')
    }

    // const channel = pusher.subscribe('notifications')

    // const channel =
    //   echo.channel('notifications') /
    //   channel.bind('pusher:subscription_succeeded', () => {
    //     console.log(
    //       '%c✅ Pusher kết nối thành công!',
    //       'color: green; font-weight: bold;'
    //     )
    //   })
    //
    // channel.bind('pusher:subscription_error', (status: any) => {
    //   console.error('❌ Lỗi kết nối Pusher:', status)
    // })

    // channel.bind(
    //   'App\\Events\\NewNotification',
    //   (data: { message: string }) => {
    //     console.log(
    //       '%c🔔 Nhận thông báo mới:',
    //       'color: blue; font-weight: bold;',
    //       data
    //     )
    //     setNotifications((prev) => [
    //       ...prev,
    //       { id: Date.now(), message: data.message, read: false },
    //     ])
    //   }
    // )
    //
    // channel.bind(
    //   'App\\Events\\NewNotification',
    //   (data: { id: number; message: string }) => {
    //     setNotifications((prev) => [
    //       ...prev,
    //       { id: data.id, message: data.message, read: false },
    //     ])
    //   }
    // )
    //
    // return () => {
    //   pusher.unsubscribe('notifications')
    //   pusher.disconnect()
    // }
  }, [])

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const hasUnread = notifications.some((n) => !n.read)

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h3 className="font-medium">Xin chào, {user?.name || 'Người dùng'}</h3>
      </div>
      <div className="flex items-center space-x-4">
        <InputSearch />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="relative rounded-full border-2 p-2 shadow"
            >
              <div
                className={`transition-transform ${hasUnread ? 'animate-shake' : ''}`}
              >
                <Bell className="animate-bell size-6 text-gray-700" />
              </div>
              {hasUnread && (
                <span className="absolute -right-1 -top-1 size-3 animate-ping rounded-full bg-red-500"></span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" side="bottom" className="mr-6 w-64 p-2">
            <h4 className="text-sm font-medium">Thông báo</h4>
            <Separator className="my-2" />
            {notifications.length > 0 ? (
              <div className="flex flex-col gap-2">
                {notifications.map((noti, index) => (
                  <div
                    key={index}
                    className={`flex cursor-pointer items-center justify-between rounded p-2 ${
                      noti.read ? 'bg-gray-100' : 'bg-blue-50'
                    }`}
                    onClick={() => markAsRead(noti.id)}
                  >
                    <span className="text-sm">{noti.message}</span>
                    {!noti.read ? (
                      <CheckCircle className="size-4 text-green-500" />
                    ) : null}
                  </div>
                ))}
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
