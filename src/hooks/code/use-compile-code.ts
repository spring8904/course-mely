import { useMutation } from '@tanstack/react-query'

import { hotToast } from '@/lib/hot-toast'
import { compileCode } from '@/services/code/compile-code'

export const useCompileCode = () => {
  return useMutation({
    mutationFn: compileCode,
    onSuccess: (res) => {
      if (res.run.code === 0) hotToast.success('Biên dịch thành công')
      else hotToast.error('Biên dịch thất bại')
    },
    onError: () => {
      hotToast.error('Biên dịch thất bại')
    },
  })
}
