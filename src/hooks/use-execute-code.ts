import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { executeCode } from '@/services/execute-code-api'

export const useExecuteCode = () => {
  return useMutation({
    mutationFn: executeCode,
    onSuccess: (res) => {
      if (res.run.code === 0) toast.success('Biên dịch thành công')
      else toast.error('Biên dịch thất bại')
    },
    onError: () => {
      toast.error('Biên dịch thất bại')
    },
  })
}
