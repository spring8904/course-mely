import api from '@/configs/api'

const prefix = 'transactions'

export const transationApi = {
  enrollFreeCourse: async (data: any) => {
    return await api.post(`${prefix}/enroll-free-course`, {
      course_id: data,
    })
  },
  applyCoupon: async (data: any) => {
    return await api.post(`${prefix}/apply-coupon`, data)
  },
}
