'use client'

import { Plus, Search } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Role } from '@/constants/role'
import StorageKey from '@/constants/storage-key'
import {
  useGetDirectChats,
  useGetGroupChats,
  useGetGroupStudent,
} from '@/hooks/chat/useChat'
import { setLocalStorage } from '@/lib/common'
import { useAuthStore } from '@/stores/useAuthStore'
import { IChannel } from '@/types/Chat'
import { ChatItem, ChatSkeleton, GroupChatSkeleton } from './chat-item'
import DialogAddGroupChat from './dialog-add-group-chat'

export const ChatSidebar = ({
  selectedChannel,
  setSelectedChannel,
}: {
  selectedChannel: IChannel | null
  setSelectedChannel: React.Dispatch<React.SetStateAction<IChannel | null>>
}) => {
  const { role } = useAuthStore()
  const isInstructor = role === Role.INSTRUCTOR

  const [activeTab, setActiveTab] = useState<'chats' | 'contacts'>('chats')
  const [addGroupChat, setAddGroupChat] = useState(false)

  const getGroupChat = isInstructor ? useGetGroupChats : useGetGroupStudent

  const { data: groupChatData, isLoading: isLoadingGroupChat } = getGroupChat()
  const { data: directChatData, isLoading: isLoadingDirectChatData } =
    useGetDirectChats()

  const handleChannelSelect = (channel: IChannel) => {
    setSelectedChannel(channel)
    setLocalStorage(StorageKey.CHANNEL, channel)
  }

  return (
    <>
      <div className="flex w-80 flex-col border-r">
        <div className="border-b p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Liên hệ</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm..." className="pl-8" />
          </div>
        </div>

        <div className="flex border-b">
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'chats'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('chats')}
          >
            Nhóm của tôi
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'contacts'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('contacts')}
          >
            Học viên
          </button>
        </div>

        <ScrollArea className="flex-1">
          {activeTab === 'chats' ? (
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Liên hệ gần đây
                </h3>
              </div>

              {!isLoadingDirectChatData ? (
                directChatData?.map((channel) => (
                  <ChatItem
                    key={channel.id}
                    channel={channel}
                    isSelected={channel.conversation_id === selectedChannel?.id}
                    onClick={() => handleChannelSelect(channel)}
                  />
                ))
              ) : (
                <ChatSkeleton />
              )}

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Nhóm của tôi
                  </h3>
                  {isInstructor && (
                    <Button
                      onClick={() => setAddGroupChat(true)}
                      size="icon"
                      variant="ghost"
                      className="size-4"
                    >
                      <Plus className="size-4" />
                    </Button>
                  )}
                </div>

                {!isLoadingGroupChat ? (
                  groupChatData?.map((channel) => (
                    <ChatItem
                      key={channel.id}
                      channel={channel}
                      isSelected={
                        channel.conversation_id === selectedChannel?.id
                      }
                      onClick={() => handleChannelSelect(channel)}
                    />
                  ))
                ) : (
                  <GroupChatSkeleton />
                )}
              </div>
            </div>
          ) : (
            <div className="p-4"></div>
          )}
        </ScrollArea>
      </div>

      {isInstructor && (
        <DialogAddGroupChat
          onClose={() => setAddGroupChat(false)}
          open={addGroupChat}
        />
      )}
    </>
  )
}
