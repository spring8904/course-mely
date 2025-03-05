import { useQuery } from '@tanstack/react-query'

import QueryKey from '@/constants/query-key'
import { orderApi } from '@/services/order/order-api'

export const useGetOrders = () => {
  return useQuery({
    queryKey: [QueryKey.ORDER],
    queryFn: () => orderApi.getOrders(),
  })
}

export const useGetOrderById = (id?: number) => {
  return useQuery({
    queryKey: [QueryKey.ORDER, id],
    queryFn: () => orderApi.getOrderDetail(id!),
    enabled: !!id,
  })
}
