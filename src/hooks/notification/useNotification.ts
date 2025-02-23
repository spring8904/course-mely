import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'react-toastify'

import QUERY_KEY from '@/constants/query-key'
import { notificationApi } from '@/services/notification/notification-api'

type Notification = {
  id: string
  message: string
  read_at: string | null
}

type NotificationResponse = {
  notifications: Notification[]
  next_page: number | null
}

export const useGetNotifications = () => {
  return useInfiniteQuery<NotificationResponse, Error>({
    queryKey: [QUERY_KEY.USER_NOTIFICATION],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await notificationApi.getNotifications(
        pageParam as number
      )
      return response
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.next_page ?? null,
  })
}

export const useMarkAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => notificationApi.markAsRead(id),
    onSuccess: async (res: any) => {
      toast.info(res.message)
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USER_NOTIFICATION],
      })
    },
    onError: (error: any) => {
      toast.error(error.message)
    },
  })
}
