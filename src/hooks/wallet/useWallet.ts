import { useMutation, useQuery } from '@tanstack/react-query'

import { WithDrawalRequestPayload } from '@/validations/support-bank'
import QueryKey from '@/constants/query-key'
import { instructorWalletApi } from '@/services/wallet/wallet-api'

export const useGetWallet = () => {
  return useQuery({
    queryKey: [QueryKey.INSTRUCTOR_WALLET],
    queryFn: () => instructorWalletApi.getWallet(),
  })
}

export const useGetWithDrawalRequests = (filters?: {
  fromDate?: string | undefined
  toDate?: string | undefined
}) => {
  return useQuery({
    queryKey: [QueryKey.INSTRUCTOR_WITH_DRAW_REQUEST, filters],
    queryFn: () => instructorWalletApi.getWithDrawRequests(filters),
  })
}

export const useGetWithDrawalRequest = (id: string) => {
  return useQuery({
    queryKey: [QueryKey.INSTRUCTOR_WITH_DRAW_REQUEST, id],
    queryFn: () => instructorWalletApi.getWithDrawRequest(id),
  })
}

export const useWithDrawalRequest = () => {
  return useMutation({
    mutationFn: (data: WithDrawalRequestPayload) =>
      instructorWalletApi.withDrawRequest(data),
  })
}

export const useHandleConfirmWithDrawalRequest = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      instructorWalletApi.handleConfirmWithDrawRequest(id, data),
  })
}
