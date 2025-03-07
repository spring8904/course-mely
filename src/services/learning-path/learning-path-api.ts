import api from '@/configs/api'
import { DraftCourse } from '@/types/DraftCourse'
import {
  CompleteLessonPayload,
  GetLessonDetailResponse,
  GetLessonsResponse,
  UpdateLastTimePayload,
} from '@/types/LearningPath'
import { CodeSubmissionPayLoad } from '@/validations/code-submission'
import { Answers } from '@/validations/quiz-submission'

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

  getQuizSubmission: async (
    lessonId: number,
    quizId: number
  ): Promise<Answers> => {
    const res = await api.get(
      `${prefix}/lesson/${lessonId}/get-quiz-submission/${quizId}`
    )
    return res.data
  },

  getCodeSubmission: async (
    lessonId: number,
    codingId: number
  ): Promise<CodeSubmissionPayLoad> => {
    const res = await api.get(
      `${prefix}/lesson/${lessonId}/get-coding-submission/${codingId}`
    )
    return res.data
  },

  completeLesson: (
    lessonId: number,
    payload: CompleteLessonPayload
  ): Promise<any> => {
    return api.patch(`${prefix}/lesson/${lessonId}/complete-lesson`, payload)
  },

  updateLastTime: ({ lesson_id, last_time_video }: UpdateLastTimePayload) => {
    return api.put(`${prefix}/lesson/${lesson_id}/update-last-time-video`, {
      last_time_video,
    })
  },

  getDraftCourse: async (slug: string): Promise<DraftCourse> => {
    const res = await api.get(`${prefix}/draft/${slug}`)
    return res.data
  },
}
