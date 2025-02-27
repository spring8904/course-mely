import {
  LessonCommentPayload,
  ReplyLessonCommentPayload,
} from '@/validations/comment'
import api from '@/configs/api'

const prefix = 'lessons/comments'

export const commentLessonApi = {
  getCommentLessons: async (lessonId: string) => {
    return await api.get(`${prefix}/${lessonId}/lesson-comment`)
  },
  storeCommentLesson: async (data: LessonCommentPayload) => {
    return await api.post(`${prefix}/store-lesson-comment`, data)
  },
  storeReplyCommentLesson: async (
    commentId: string,
    data: ReplyLessonCommentPayload
  ) => {
    return await api.post(`${prefix}/${commentId}/reply`, data)
  },
}
