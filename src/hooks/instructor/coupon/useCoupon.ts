import { useMutation, useQuery } from '@tanstack/react-query'

import { CouponPayload } from '@/validations/coupon'
import QUERY_KEY from '@/constants/query-key'
import { instructorCouponApi } from '@/services/instructor/coupon/coupon-api'

export const useGetCoupons = (filters?: {
  fromDate?: string | undefined
  toDate?: string | undefined
}) => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_COUPON, filters],
    queryFn: () => instructorCouponApi.getCoupons(filters),
  })
}

export const useGetCoupon = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_COUPON, id],
    queryFn: () => instructorCouponApi.getCoupon(id),
    enabled: !!id,
  })
}

export const useCreateCoupon = () => {
  return useMutation({
    mutationFn: (data: CouponPayload) => instructorCouponApi.createCoupon(data),
  })
}

export const useUpdateCoupon = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CouponPayload }) =>
      instructorCouponApi.updateCoupon(id, data),
  })
}

export const useToggleStatus = () => {
  return useMutation({
    mutationFn: ({ id, action }: { id: string; action: string }) =>
      instructorCouponApi.toggleStatus(id, action),
  })
}
