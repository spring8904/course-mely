import { useMutation, useQuery } from '@tanstack/react-query'
import QUERY_KEY from '@/constants/query-key'
import { chatApi } from '@/services/chat/chat-api'
import {
  AddMemberGroupChatPayload,
  CreateGroupChatPayload,
  MessagePayload,
} from '@/validations/chat'

export const useGetDirectChats = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GROUP_DIRECT],
    queryFn: () => chatApi.getDirectChats(),
  })
}

export const useGetGroupChats = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GROUP_CHAT],
    queryFn: () => chatApi.getGroupChats(),
  })
}

export const useGetInfoGroupChat = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GROUP_CHAT, id],
    queryFn: () => chatApi.getInfoGroupChat(id!),
    enabled: !!id,
  })
}

export const useGetMessage = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GROUP_CHAT, id],
    queryFn: () => chatApi.getMessages(id!),
    enabled: !!id,
  })
}

export const useCreateGroupChat = () => {
  return useMutation({
    mutationFn: (data: CreateGroupChatPayload) => chatApi.createGroupChat(data),
  })
}

export const useAddMemberGroupChat = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: AddMemberGroupChatPayload
    }) => chatApi.addMemberGroupChat(id, data),
  })
}

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (data: MessagePayload) => chatApi.sendMessage(data),
  })
}
