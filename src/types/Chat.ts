export interface IMessage {
  id: number
  senderId: number
  timestamp: string
  text: string
  content: string
  type: 'text' | 'image' | 'file' | 'video' | 'audio'
  meta_data?: {
    file_path: string
    [key: string]: any
  }
  sender: {
    name: string
    avatar: string
  }
}

export interface IChannel {
  id: number
  name: string
  avatar: string
  conversation_id: number
  is_online?: boolean
  type?: 'group' | 'direct'
  pivot?: {
    conversation_id: number
  }
  users_count: number
  online_users: number
}
