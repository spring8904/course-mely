import api from '@/configs/api'

const prefix = 'learning-paths'

export const learningPathApi = {
  getLessonInfo: async (course: string, lesson: string) => {
    return await api.get(`${prefix}/${course}/lesson/${lesson}`)
  },
}
