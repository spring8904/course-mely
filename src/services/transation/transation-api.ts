import api from '@/configs/api'

const prefix = 'transactions'

export const transationApi = {
  enrollFreeCourse: async (data: any) => {
    console.log(data)
    return await api.post(`${prefix}/enroll-free-course`, {
      course_id: data,
    })
  },
}
