import { useMutation } from '@tanstack/react-query'

import { hotToast } from '@/lib/hot-toast'
import { compileCode } from '@/services/code/compile-code'

export const useCompileCode = () => {
  return useMutation({
    mutationFn: (data: any) => compileCode(data),
    onSuccess: () => {
      hotToast.success('Biên dịch thành công')
    },
    onError: () => {
      hotToast.error('Biên dịch thất bại')
    },
  })
}
