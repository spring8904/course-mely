import { useMutation, useQuery } from '@tanstack/react-query'

import { WithDrawalRequestPayload } from '@/validations/support-bank'
import QUERY_KEY from '@/constants/query-key'
import { instructorWalletApi } from '@/services/wallet/wallet-api'

export const useGetWallet = () => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_WALLET],
    queryFn: () => instructorWalletApi.getWallet(),
  })
}

export const useWithDrawalRequest = () => {
  return useMutation({
    mutationFn: (data: WithDrawalRequestPayload) =>
      instructorWalletApi.withDrawRequest(data),
  })
}
