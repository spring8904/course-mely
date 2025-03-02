import api from '@/configs/api'

const prefix = 'ratings'

export const ratingApi = {
  storeRating: async (data: any) => {
    return await api.post(`${prefix}`, data)
  },
  checkCourseRatingState: async (slug: string) => {
    return await api.get(`${prefix}/${slug}/checkCourseState`)
  },
}
