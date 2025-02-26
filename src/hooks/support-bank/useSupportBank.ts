import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { supportBankApi } from '@/services/support-bank/support-bank-api'

export const useGetSupportBanks = () => {
  return useQuery({
    queryKey: [QUERY_KEY.SUPPORT_BANKS],
    queryFn: () => supportBankApi.getSupportBanks(),
  })
}
