import { ILesson, ILessonLearningPath, ILessonProcess } from '@/types'
import api from '@/configs/api'

type GetLessonsResponse = {
  chapter_id: number
  chapter_title: string
  lessons: ILessonLearningPath[]
}[]

interface GetLessonDetailResponse {
  lesson: ILesson
  next_lesson: ILesson | null
  previous_lesson: ILesson | null
  lesson_process: ILessonProcess
}

const prefix = 'learning-paths'

export const learningPathApi = {
  getLessons: async (course: string): Promise<GetLessonsResponse> => {
    const response = await api.get(`${prefix}/${course}/lesson`)
    return response.data
  },
  getLessonDetail: async (
    course: string,
    lesson: string
  ): Promise<GetLessonDetailResponse> => {
    const response = await api.get(`${prefix}/${course}/lesson/${lesson}`)
    return response.data
  },
}
