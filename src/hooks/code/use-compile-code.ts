import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { compileCode } from '@/services/code/compile-code'

export const useCompileCode = () => {
  return useMutation({
    mutationFn: compileCode,
    onSuccess: (res) => {
      if (res.run.code === 0) toast.success('Biên dịch thành công')
      else toast.error('Biên dịch thất bại')
    },
    onError: () => {
      toast.error('Biên dịch thất bại')
    },
  })
}
