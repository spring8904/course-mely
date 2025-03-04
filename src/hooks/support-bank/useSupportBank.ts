import { useQuery } from '@tanstack/react-query'

import QueryKey from '@/constants/query-key'
import { supportBankApi } from '@/services/support-bank/support-bank-api'

export const useGetSupportBanks = () => {
  return useQuery({
    queryKey: [QueryKey.SUPPORT_BANKS],
    queryFn: () => supportBankApi.getSupportBanks(),
  })
}
