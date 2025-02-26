import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { orderApi } from '@/services/order/order-api'

export const useGetOrders = () => {
  return useQuery({
    queryKey: [QUERY_KEY.ORDER],
    queryFn: () => orderApi.getOrders(),
  })
}

export const useGetOrderById = (id?: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.ORDER, id],
    queryFn: () => orderApi.getOrderDetail(id!),
    enabled: !!id,
  })
}
