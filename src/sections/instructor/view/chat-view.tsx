'use client'

import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import type { EmojiClickData } from 'emoji-picker-react'
import {
  Archive,
  Info,
  Loader2,
  Mic,
  MoreVertical,
  Paperclip,
  Plus,
  Search,
  Send,
  Smile,
  Trash2,
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
import echo from '@/lib/echo'
import { useAuthStore } from '@/stores/useAuthStore'
import { MessagePayload } from '@/validations/chat'
import { timeAgo } from '@/lib/common'
import MessageContent from '@/components/shared/message-content'
import { IChannel, IMessage } from '@/types/Chat'
import { SidebarChatInfo } from '@/components/shared/sidebar-chat-info'

interface FilePreview {
  name: string
  url: string
  type: 'file' | 'image'
  blob: Blob
}

const ChatView = () => {
  const { user } = useAuthStore()

  const [message, setMessage] = useState('')
  const [chats, setChats] = useState<Record<number, IMessage[]>>({})
  const [addGroupChat, setAddGroupChat] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState<IChannel | null>(
    () => {
      const saved = localStorage.getItem('selectedChannel')
      return saved ? JSON.parse(saved) : null
    }
  )

  const [currentUser, setCurrentUser] = useState<number | null>(null)

  const [activeTab, setActiveTab] = useState<'chats' | 'contacts'>('chats')
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const { data: groupChatData, isLoading: isLoadingGroupChat } =
    useGetGroupChats()
  const { data: directChatData, isLoading: isLoadingDirectChatData } =
    useGetDirectChats()
  const { data: getMessageData, isLoading: isLoadingGetMessageData } =
    useGetMessage(selectedChannel?.conversation_id ?? 0)
  const { mutate: senderMessage, isPending: isPendingSendMessage } =
    useSendMessage()

  useEffect(() => {
    if (getMessageData && selectedChannel) {
      const conversationId = selectedChannel?.conversation_id

      const messages = getMessageData?.messages || []

      const formattedMessages = messages.map((msg: any) => ({
        id: msg.id,
        senderId: msg.sender_id,
        text: msg.content,
        type: msg.type,
        meta_data: msg.meta_data,
        timestamp: new Date(msg.created_at).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        sender: {
          name: msg.sender.name,
          avatar: msg.sender.avatar,
        },
      }))

      setCurrentUser(user?.id ?? null)

      setChats((prev) => ({
        ...prev,
        [conversationId]: formattedMessages,
      }))
    }
  }, [getMessageData, selectedChannel, user?.id])

  const handleChannelSelect = (channel: any) => {
    setSelectedChannel(channel)
    localStorage.setItem('selectedChannel', JSON.stringify(channel))
  }

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showSearch])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chats])

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji)
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

  const removeFilePreview = (index: number) => {
    setFilePreviews((prev) => {
      const newPreviews = [...prev]
      URL.revokeObjectURL(newPreviews[index].url)
      newPreviews.splice(index, 1)
      return newPreviews
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  useEffect(() => {
    return () => {
      Object.values(chats).forEach((messages) => {
        messages.forEach((msg) => {
          if (msg.meta_data?.file_path) {
            URL.revokeObjectURL(msg.meta_data.file_path)
          }
        })
      })
      filePreviews.forEach((preview) => {
        URL.revokeObjectURL(preview.url)
      })
    }
  }, [chats, filePreviews])

  useEffect(() => {
    if (selectedChannel) {
      const conversationId = selectedChannel.conversation_id
      const channel = echo.private(`conversation.${conversationId}`)

      const handleNewMessage = (event: any) => {
        setChats((prevChats) => ({
          ...prevChats,
          [conversationId]: [
            ...(prevChats[conversationId] || []),
            {
              id: event.message_id,
              senderId: event.sender.id,
              content: event.content,
              text: event.content,
              type: event.type || 'text',
              meta_data: event.meta_data,
              timestamp: timeAgo(event.sent_at),
              sender: {
                name: event?.sender?.name || 'Unknown',
                avatar: event?.sender?.avatar ?? '',
              },
            } satisfies IMessage,
          ],
        }))
      }

      channel.listen('.MessageSent', handleNewMessage)

      return () => {
        channel.stopListening('.MessageSent')
      }
    }
  }, [selectedChannel])

  const sendMessage = () => {
    if (!message.trim() && filePreviews.length === 0) return
    if (!selectedChannel?.conversation_id) return

    let filesData = undefined
    if (filePreviews.length > 0) {
      filesData = filePreviews.map((preview) => ({
        name: preview.name,
        url: URL.createObjectURL(preview.blob),
        type: preview.type,
        blob: preview.blob,
      }))
    }

    const newMessage: MessagePayload = {
      conversation_id: selectedChannel?.conversation_id,
      parent_id: undefined,
      content: message,
      type: 'text',
      file: filesData,
    }

    senderMessage(newMessage, {
      onSuccess: (response: any) => {
        console.log('Message sent successfully', response.data)
        setMessage('')
      },
    })

    filePreviews.forEach((preview) => {
      URL.revokeObjectURL(preview.url)
    })
    setFilePreviews([])
  }

  console.log(selectedChannel)

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

        <div className="flex w-80 flex-col border-r">
          <div className="border-b p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Chats</h2>
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
                </div>

                {isLoadingDirectChatData ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="size-8 animate-spin text-orange-500" />
                  </div>
                ) : (
                  directChatData?.data.map((user: any) => (
                    <div
                      key={user.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-secondary ${
                        user.id === selectedChannel?.id ? 'bg-secondary' : ''
                      }`}
                      onClick={() => {
                        handleChannelSelect(user)
                      }}
                    >
                      <div className="relative">
                        <Avatar className="size-8">
                          <AvatarImage
                            src={user.avatar}
                            alt={user.name}
                            className="object-cover"
                          />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
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
                  ))
                )}
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Nhóm của tôi
                    </h3>
                    <Button
                      onClick={() => setAddGroupChat(true)}
                      size="icon"
                      variant="ghost"
                      className="size-4"
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>

                  {isLoadingGroupChat ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="size-8 animate-spin text-orange-500" />
                    </div>
                  ) : (
                    groupChatData?.data.map((channel: any) => (
                      <div
                        key={channel.id}
                        className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-secondary"
                        onClick={() => handleChannelSelect(channel)}
                      >
                        <span className="text-muted-foreground">#</span>
                        <span className="flex-1 text-sm font-medium">
                          {channel.name}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4"></div>
            )}
          </ScrollArea>
        </div>
        <div className="flex flex-1 flex-col">
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
                        {selectedChannel?.online ? 'Online' : 'Offline'}
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
                Vui lòng chọn người bạn muốn liên hệ.
              </p>
            </div>
          )}

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {isLoadingGetMessageData ||
              isLoadingDirectChatData ||
              isLoadingGroupChat ? (
                <div className="flex h-full items-center justify-center">
                  <Loader2 className="size-8 animate-spin text-orange-500" />
                </div>
              ) : (
                selectedChannel?.conversation_id !== undefined &&
                chats[selectedChannel.conversation_id]?.map((msg: IMessage) => {
                  const isCurrentUser = msg.senderId === currentUser
                  const isGroupChat = selectedChannel?.type === 'group'
                  const isTextMessage = msg.type === 'text'

                  return (
                    <div
                      key={msg.id}
                      className={`mr-4 flex items-start gap-3 ${
                        isCurrentUser ? 'justify-end' : ''
                      }`}
                    >
                      {!isCurrentUser && (
                        <Avatar className="size-8">
                          <AvatarImage
                            src={msg.sender.avatar}
                            alt={msg.sender.name}
                          />
                          <AvatarFallback>{msg.sender.name}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`${isCurrentUser ? 'text-right' : ''}`}>
                        {isGroupChat && !isCurrentUser && (
                          <div className="mb-1 text-sm font-medium text-gray-600">
                            {msg.sender.name}
                          </div>
                        )}
                        <div
                          className={`rounded-lg ${
                            isTextMessage
                              ? `p-3 ${
                                  isCurrentUser
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-200'
                                }`
                              : ''
                          }`}
                        >
                          <MessageContent message={msg} />
                        </div>
                        <span className="text-xs text-gray-500">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {filePreviews.length > 0 && (
            <div className="border-t bg-secondary p-2">
              <ScrollArea className="h-32">
                <div className="grid grid-cols-4 gap-2 p-2">
                  {filePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      {preview.type === 'image' ? (
                        <div className="group relative">
                          <img
                            src={preview.url}
                            alt={preview.name}
                            className="h-24 w-full rounded-lg object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-8 text-white hover:text-white/80"
                              onClick={() => removeFilePreview(index)}
                            >
                              <X className="size-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="group relative flex h-24 flex-col items-center justify-center rounded-lg bg-background p-2">
                          <Paperclip className="mb-1 size-6" />
                          <span className="line-clamp-2 px-1 text-center text-xs">
                            {preview.name}
                          </span>
                          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-8 text-white hover:text-white/80"
                              onClick={() => removeFilePreview(index)}
                            >
                              <X className="size-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="flex items-center justify-center">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-24 w-full rounded-lg"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Plus className="size-6" />
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}

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
                    disabled={isPendingSendMessage}
                  >
                    <Send className="size-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedChannel && (
          <SidebarChatInfo
            selectedChannel={selectedChannel}
            messages={chats[selectedChannel?.conversation_id] || []}
            setSelectedChannel={setSelectedChannel}
          />
        )}
      </div>
      {addGroupChat && (
        <DialogAddGroupChat
          onClose={() => setAddGroupChat(false)}
          open={addGroupChat}
        />
      )}
    </>
  )
}

export default ChatView
