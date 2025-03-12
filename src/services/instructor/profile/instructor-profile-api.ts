import api from '@/configs/api'
import { IInstructorProfileResponse } from '@/types'

export const instructorProfileApi = {
  getProfile: async (code: string): Promise<IInstructorProfileResponse> => {
    return await api.get(`instructor-info/${code}/`)
  },
}
