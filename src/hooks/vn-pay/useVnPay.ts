import { useMutation } from '@tanstack/react-query'

import { vnPayApi } from '@/services/vn-pay/vnpay-api'

export const useCreateVNPayPayment = () => {
  return useMutation({
    mutationFn: (data: any) => vnPayApi.createVNPayPayment(data),
  })
}
