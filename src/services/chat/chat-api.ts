import api from '@/configs/api'
import {
  AddMemberGroupChatPayload,
  CreateGroupChatPayload,
  MessagePayload,
} from '@/validations/chat'

const prefix = '/chats'
const prefixGroupChat = '/chats/group'
const prefixDirectChat = '/chats/direct'

export const chatApi = {
  getDirectChats: async () => {
    return await api.get(`${prefixDirectChat}/get-direct-chats`)
  },
  getGroupChats: async () => {
    return await api.get(`${prefixGroupChat}/get-group-chats`)
  },
  getInfoGroupChat: async (id: string) => {
    return await api.get(`${prefixGroupChat}/info-group-chat/${id}`)
  },
  getRemainingMembers: async (id: string) => {
    return await api.get(`${prefixGroupChat}/${id}/remaining-members`)
  },
  getMessages: async (id: string) => {
    const response = await api.get(`${prefix}/get-message/${id}`)
    return response.data
  },
  createGroupChat: async (data: CreateGroupChatPayload) => {
    return await api.post(`${prefixGroupChat}/create-group-chat`, data)
  },
  addMemberGroupChat: async (id: string, data: AddMemberGroupChatPayload) => {
    return await api.post(
      `${prefixGroupChat}/add-member-group-chat/${id}`,
      data
    )
  },
  sendMessage: async (data: MessagePayload) => {
    return await api.post(`${prefix}/send-message`, data)
  },
}
