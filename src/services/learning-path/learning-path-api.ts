import { ILesson, ILessonProcess, LearningPathChapterLesson } from '@/types'
import { CodeSubmissionPayLoad } from '@/validations/code-submission'
import { QuizSubmissionPayload } from '@/validations/quiz-submission'
import api from '@/configs/api'

export interface GetLessonsResponse {
  course_name: string
  total_lesson: number
  chapter_lessons: LearningPathChapterLesson[]
}

interface GetLessonDetailResponse {
  lesson: ILesson
  next_lesson: ILesson | null
  previous_lesson: ILesson | null
  lesson_process: ILessonProcess
}

interface CompleteLessonPayload
  extends Partial<CodeSubmissionPayLoad>,
    Partial<QuizSubmissionPayload> {
  lesson_id: number
  current_time?: number
}

interface UpdateLastTimePayload {
  lesson_id: number
  last_time_video: number
}

const prefix = 'learning-paths'

export const learningPathApi = {
  getLessons: async (course: string): Promise<GetLessonsResponse> => {
    const response = await api.get(`${prefix}/${course}/lesson`)
    return response.data
  },
  getChapterFromLesson: async (lessonId: number) => {
    return await api.get(`${prefix}/${lessonId}/get-chapter-from-lesson`)
  },
  getLessonDetail: async (
    course: string,
    lesson: string
  ): Promise<GetLessonDetailResponse> => {
    const response = await api.get(`${prefix}/${course}/lesson/${lesson}`)
    return response.data
  },

  completeLesson: ({ lesson_id, ...payload }: CompleteLessonPayload) => {
    return api.patch(`${prefix}/lesson/${lesson_id}/complete-lesson`, payload)
  },

  updateLastTime: ({ lesson_id, last_time_video }: UpdateLastTimePayload) => {
    return api.put(`${prefix}/lesson/${lesson_id}/update-last-time-video`, {
      last_time_video,
    })
  },
}
