import { RegisterInstructorInput } from '@/validations/instructor'
import api from '@/configs/api'

const prefix = '/instructor/register'

export const instructorRegisterApi = {
  register: (data: RegisterInstructorInput) => {
    return api.post(prefix, data)
  },
}
