import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { compileCode } from '@/services/code/compile-code'

export const useCompileCode = () => {
  return useMutation({
    mutationFn: (data: any) => compileCode(data),
    onSuccess: () => {
      toast.success('Biên dịch thành công')
    },
    onError: () => {
      toast.error('Biên dịch thất bại')
    },
  })
}
