import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { RegisterInstructorInput } from '@/validations/instructor'
import QUERY_KEY from '@/constants/query-key'
import { instructorRegisterApi } from '@/services/instructor/register/instructor-register-api'

export const useInstructorRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegisterInstructorInput) => {
      const formData = new FormData()

      const { qa_systems, certificates } = data

      qa_systems.forEach((item, index) => {
        Object.entries(item).forEach(([fieldKey, value]) => {
          if (Array.isArray(value)) {
            value.forEach((val, subIndex) => {
              formData.append(
                `qa_systems[${index}][${fieldKey}][${subIndex}]`,
                val + ''
              )
            })
          } else {
            formData.append(`qa_systems[${index}][${fieldKey}]`, value + '')
          }
        })
      })

      if (certificates) {
        certificates.forEach((certificate, index) => {
          if (certificate.file)
            formData.append(`certificates[${index}]`, certificate.file)
        })
      }

      return instructorRegisterApi.register(formData)
    },
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.AUTH],
      })
      toast.success(res.message)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
