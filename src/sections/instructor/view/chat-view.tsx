'use client'

import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import type { EmojiClickData } from 'emoji-picker-react'
import {
  Archive,
  Bell,
  Info,
  Loader2,
  Mic,
  MoreHorizontal,
  MoreVertical,
  Paperclip,
  Plus,
  Search,
  Send,
  Smile,
  Trash2,
  UserRoundPlus,
  Volume2,
  X,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import DialogAddGroupChat from '@/sections/chat/_components/dialog-add-group-chat'
import {
  useGetDirectChats,
  useGetGroupChats,
  useGetMessage,
  useSendMessage,
} from '@/hooks/chat/useChat'
import InviteMember from '@/sections/chat/_components/invite-member'
import echo from '@/lib/echo'
import { useAuthStore } from '@/stores/useAuthStore'

interface Message {
  id: number
  sender_id: number
  parent_id: number | null
  content: string
  type: string
  meta_data: {
    read: boolean
    send_at: string
  }
  created_at: string
  updated_at: string
  sender: {
    id: number
    name: string
    avatar: string
  }
}

interface User {
  id: number
  name: string
  avatar: string
  online?: boolean
  messages?: number
  initials?: string
}

interface FilePreview {
  name: string
  url: string
  type: 'file' | 'image'
  blob: Blob
}

interface Channel {
  id: number
  name: string
  avatar: string
  conversation_id: number
  is_online?: boolean
  type?: 'group' | 'direct'
  pivot?: {
    conversation_id: number
  }
}

const users: User[] = [
  {
    id: 1,
    name: 'Alice Cruickshank',
    avatar: 'https://i.pravatar.cc/150?img=1',
    initials: 'AC',
    online: true,
  },
  {
    id: 2,
    name: 'Barrett Brown',
    avatar: 'https://i.pravatar.cc/150?img=2',
    initials: 'BB',
    online: false,
  },
  {
    id: 3,
    name: 'Chris Kiernan',
    avatar: 'https://i.pravatar.cc/150?img=3',
    initials: 'CK',
    online: true,
  },
  {
    id: 4,
    name: 'Clifford Taylor',
    avatar: 'https://i.pravatar.cc/150?img=4',
    initials: 'CT',
    online: true,
  },
  {
    id: 5,
    name: 'Edith Evans',
    avatar: 'https://i.pravatar.cc/150?img=5',
    initials: 'EE',
    online: false,
  },
  {
    id: 7,
    name: 'Frank Thomas',
    avatar: 'https://i.pravatar.cc/150?img=6',
    initials: 'FT',
    online: false,
  },
]

const ChatView = () => {
  const [message, setMessage] = useState('')
  const [selectedUser, setSelectedUser] = useState<User>(users[3])
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts'>('chats')
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [chats, setChats] = useState<Record<number, Message[]>>({})
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const { user } = useAuthStore()

  const [addGroupChat, setAddGroupChat] = useState(false)
  const [addInviteMember, setInviteMember] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(() => {
    const saved = localStorage.getItem('selectedChannel')
    return saved ? JSON.parse(saved) : null
  })

  const [currentUser, setCurrentUser] = useState(null)

  const { data: groupChatData, isLoading: isLoadingGroupChat } =
    useGetGroupChats()
  const { data: directChatData, isLoading: isLoadingDirectChatData } =
    useGetDirectChats()
  const { data: getMessageData, isLoading: isLoadingGetMessageData } =
    useGetMessage(selectedChannel?.conversation_id)
  const { mutate: senderMessage, isPending: isPendingSendMessage } =
    useSendMessage()

  console.log(getMessageData)

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showSearch])

  useEffect(() => {
    if (getMessageData && selectedChannel?.conversation_id) {
      const conversationId = selectedChannel?.conversation_id

      const formattedMessages = getMessageData.messages.map((msg: any) => ({
        id: msg.id,
        senderId: msg.sender_id,
        text: msg.content,
        timestamp: new Date(msg.created_at).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        sender: {
          name: msg.sender.name,
          avatar: msg.sender.avatar,
        },
      }))

      setCurrentUser(user?.id)

      setChats((prev) => ({
        ...prev,
        [conversationId]: formattedMessages,
      }))
    }
  }, [getMessageData, selectedChannel])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats, selectedChannel])

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji)
  }

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
    setSelectedChannel(null)
  }

  const handleChannelSelect = (channel: any) => {
    setSelectedChannel(channel)
    setSelectedUser(null)
    localStorage.setItem('selectedChannel', JSON.stringify(channel))
  }

  const handleFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'file' | 'image'
  ) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const newPreviews = files
      .map((file) => {
        if (type === 'image' && !file.type.startsWith('image/')) {
          alert('Please select an image file')
          return null
        }

        const fileUrl = URL.createObjectURL(file)
        return {
          name: file.name,
          url: fileUrl,
          type,
          blob: file,
        }
      })
      .filter((preview) => preview !== null)

    setFilePreviews((prev) => [...prev, ...newPreviews])
    e.target.value = ''
  }

  const sendMessage = () => {
    if (!message.trim() && filePreviews.length === 0) return

    const now = new Date()
    const timestamp = now
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
      .toLowerCase()

    let filesData = undefined
    if (filePreviews.length > 0) {
      filesData = filePreviews.map((preview) => ({
        name: preview.name,
        url: URL.createObjectURL(preview.blob),
        type: preview.type,
        blob: preview.blob,
      }))
    }

    const newMessage = {
      id: user?.id,
      conversation_id: selectedChannel?.conversation_id,
      sender_id: user?.id,
      parent_id: undefined,
      content: message,
      type: 'text',
      timestamp,
      files: filesData,
    }

    senderMessage(newMessage, {
      onSuccess: (response: any) => {
        const { data } = response
        const { conversation_id, content, created_at, id, sender_id } = data

        selectedChannel?.conversation_id
        setChats((prevChats: any) => ({
          ...prevChats,
          [conversation_id]: [
            ...(prevChats[conversation_id] || []),
            {
              id, // ID từ server
              senderId: sender_id,
              text: content,
              timestamp: new Date(created_at).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              }),
              sender: {
                name: user.name,
                avatar: user.avatar,
              },
            },
          ],
        }))

        setMessage('')
      },
    })

    filePreviews.forEach((preview) => {
      URL.revokeObjectURL(preview.url)
    })
    setFilePreviews([])
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  useEffect(() => {
    if (selectedChannel) {
      const channel = echo.private(`conversation.${selectedChannel.id}`)

      channel.listen('.MessageNotification', (event: any) => {
        console.log('New message received: ', event)
        const { content, created_at, id, sender_id } = event

        setChats((prevChats: any) => ({
          ...prevChats,
          [selectedChannel.id]: [
            ...(prevChats[selectedChannel.id] || []),
            {
              id,
              senderId: sender_id,
              text: content,
              timestamp: new Date(created_at).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              }),
              sender: {
                name: event?.sender?.name || 'Unknown',
                avatar: event?.sender?.avatar || '',
              },
            },
          ],
        }))
      })

      return () => {
        channel.stopListening('.MessageNotification')
      }
    }
  }, [selectedChannel])

  const channel = echo.private(
    `conversation.${selectedChannel?.conversation_id}`
  )

  return (
    <>
      <div className="flex h-[650px] bg-white">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleFileSelect(e, 'file')}
          accept=".pdf,.doc,.docx,.txt,.zip,.rar"
          multiple
        />
        <input
          type="file"
          ref={imageInputRef}
          className="hidden"
          onChange={(e) => handleFileSelect(e, 'image')}
          accept="image/*"
          multiple
        />

        {/* Sidebar */}
        <div className="flex w-80 flex-col border-r">
          <div className="border-b p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Chats</h2>
              <Button
                onClick={() => setAddGroupChat(true)}
                size="icon"
                variant="ghost"
              >
                <Plus className="size-5" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
              <Input placeholder="Search here..." className="pl-8" />
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
                  <Button size="icon" variant="ghost" className="size-4">
                    <Plus className="size-4" />
                  </Button>
                </div>

                {directChatData?.data.map((user: any) => (
                  <div
                    key={user.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-secondary ${
                      user.id === selectedUser?.id ? 'bg-secondary' : ''
                    }`}
                    onClick={() => {
                      handleUserSelect(user)
                      handleChannelSelect(user)
                    }}
                  >
                    <div className="relative">
                      <Avatar className="size-8">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="object-cover"
                        />
                      </Avatar>
                      {user.online && (
                        <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                      )}
                    </div>
                    <span className="flex-1 text-sm font-medium">
                      {user.name}
                    </span>
                    {user.messages && (
                      <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {user.messages}
                      </span>
                    )}
                  </div>
                ))}

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Nhóm của tôi
                    </h3>
                    <Button size="icon" variant="ghost" className="size-4">
                      <Plus className="size-4" />
                    </Button>
                  </div>

                  {groupChatData?.data.map((channel: any) => (
                    <div
                      key={channel.id}
                      className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-secondary"
                      onClick={() => handleChannelSelect(channel)}
                    >
                      <span className="text-muted-foreground">#</span>
                      <span className="flex-1 text-sm font-medium">
                        {channel.name}
                      </span>
                      {/*{channel.messages && (*/}
                      {/*  <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">*/}
                      {/*    {channel.messages}*/}
                      {/*  </span>*/}
                      {/*)}*/}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4"></div>
            )}
          </ScrollArea>
        </div>
        <div className="flex flex-1 flex-col">
          {/* Chat Header */}
          {selectedChannel ? (
            <div className="flex h-16 items-center justify-between border-b px-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt={selectedChannel?.name}
                  />
                </Avatar>
                <div>
                  <h2 className="text-sm font-semibold">
                    {selectedChannel.name}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {selectedChannel?.type === 'group' ? (
                      <p className="text-xs text-muted-foreground">
                        {selectedChannel?.users_count ?? 0} thành viên -{' '}
                        {selectedChannel?.online_users ?? 0} đang online
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {selectedUser?.is_online ? 'Online' : 'Offline'}
                      </p>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {showSearch ? (
                  <div className="flex items-center gap-2 rounded-md bg-secondary px-2">
                    <Search className="size-4 text-muted-foreground" />
                    <Input
                      ref={searchInputRef}
                      placeholder="Tìm kiếm tin nhắn"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8"
                      onClick={() => {
                        setShowSearch(false)
                        setSearchQuery('')
                      }}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setShowSearch(true)}
                  >
                    <Search className="size-5" />
                  </Button>
                )}
                <Button size="icon" variant="ghost">
                  <Info className="size-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoreVertical className="size-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                      <Archive className="size-4" />
                      <span>Archive</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                      <Volume2 className="size-4" />
                      <span>Muted</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex cursor-pointer items-center gap-2 text-destructive focus:text-destructive">
                      <Trash2 className="size-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">
                Select a user or channel to start chatting.
              </p>
            </div>
          )}

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {isLoadingGetMessageData ? (
                <p className="text-gray-500">Đang tải...</p>
              ) : (
                <div className="space-y-4">
                  {chats[selectedChannel?.conversation_id]?.map((msg: any) => {
                    const isCurrentUser = msg.senderId === currentUser
                    return (
                      <div
                        key={msg.id}
                        className={`mr-4 flex items-start gap-3 ${
                          isCurrentUser ? 'justify-end' : ''
                        }`}
                      >
                        {!isCurrentUser && (
                          <Avatar className="size-8">
                            <img
                              src={msg.sender?.avatar}
                              alt={msg.sender?.name}
                              className="object-cover"
                            />
                          </Avatar>
                        )}
                        <div className={`${isCurrentUser ? 'text-right' : ''}`}>
                          <div
                            className={`rounded-lg p-3 ${
                              isCurrentUser
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-200'
                            }`}
                          >
                            {msg.text}
                          </div>
                          <span className="text-xs text-gray-500">
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t bg-white p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-9 rounded-full hover:bg-secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip className="size-5 text-muted-foreground" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-9 rounded-full hover:bg-secondary"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5 text-muted-foreground"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M20.4 14.5 16 10 4 20" />
                  </svg>
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-9 rounded-full hover:bg-secondary"
                    >
                      <Smile className="size-5 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" side="top" align="start">
                    <EmojiPicker
                      onEmojiClick={onEmojiClick}
                      width="100%"
                      height={400}
                    />
                  </PopoverContent>
                </Popover>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-[40px] rounded-full hover:bg-secondary"
                >
                  <Mic className="size-4 text-muted-foreground" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input
                    placeholder="Type your message..."
                    className="border-0 bg-secondary py-6 pr-24 text-base focus-visible:ring-1 focus-visible:ring-primary"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-1/2 size-9 -translate-y-1/2 rounded-full bg-orange-500 text-white hover:bg-orange-600"
                    onClick={() => sendMessage()}
                  >
                    <Send className="size-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedChannel && (
          <div className="w-[340px] border-l p-4">
            <div className="flex flex-col items-center">
              <Avatar className="size-20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="mt-2 space-y-4 text-center">
                <h4 className="font-bold">Nhóm học tập</h4>
                <p className="text-sm text-muted-foreground">
                  Hí anh em, chat vui vẻ nhé. Admin online 24/7 nên đừng xạo nha
                  😁 Telegram: @vietnam_laravel
                </p>
                <div className="flex items-center justify-center gap-4 *:cursor-pointer">
                  <div
                    onClick={() => {
                      setInviteMember(true)
                    }}
                    className="flex size-12 items-center justify-center rounded-full bg-gray-300 p-4"
                  >
                    <UserRoundPlus size={24} />
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-gray-300 p-4">
                    <Bell size={24} />
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-gray-300 p-4">
                    <Search size={24} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-medium">Thành viên trong đoạn chat</h4>
              <h4 className="mt-2 font-medium">File phương tiện, liên kết</h4>
            </div>
          </div>
        )}
      </div>
      <DialogAddGroupChat
        onClose={() => setAddGroupChat(false)}
        open={addGroupChat}
      />
      {/*<InviteMember*/}
      {/*  isOpen={addInviteMember}*/}
      {/*  channelId={selectedChannel?.id}*/}
      {/*  onClose={() => setInviteMember(false)}*/}
      {/*/>*/}
    </>
  )
}

export default ChatView
