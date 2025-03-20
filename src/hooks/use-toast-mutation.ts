'use client'

import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useToastMutation = ({
  mutationFn,
  queryKey,
}: {
  mutationFn: MutationFunction<any, any>
  queryKey?: string[]
}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: any) => {
      return toast.promise(mutationFn(payload), {
        pending: 'Đang xử lý...',
        success: {
          render: ({ data }) => data.message as string,
        },
        error: {
          render: ({ data }: { data: { message: string } }) => data.message,
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      })
    },
  })
}
