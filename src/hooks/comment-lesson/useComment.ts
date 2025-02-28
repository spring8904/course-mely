import { useMutation, useQuery } from '@tanstack/react-query'

import {
  LessonCommentPayload,
  ReplyLessonCommentPayload,
} from '@/validations/comment'
import QUERY_KEY from '@/constants/query-key'
import { commentLessonApi } from '@/services/comment-lesson/comment-lesson-api'

export const useGetLessonComments = (lessonId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.LESSON_COMMENT, lessonId],
    queryFn: () => commentLessonApi.getCommentLessons(lessonId!),
    enabled: !!lessonId,
  })
}
export const useGetReplyLessonComment = (commentId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.LESSON_COMMENT, commentId],
    queryFn: () => commentLessonApi.getCommentReplyLesson(commentId!),
    enabled: !!commentId,
  })
}

export const useStoreCommentLesson = () => {
  return useMutation({
    mutationFn: (data: LessonCommentPayload) =>
      commentLessonApi.storeCommentLesson(data),
  })
}

export const useStoreReplyCommentLesson = () => {
  return useMutation({
    mutationFn: ({
      commentId,
      data,
    }: {
      commentId: string
      data: ReplyLessonCommentPayload
    }) => commentLessonApi.storeReplyCommentLesson(commentId, data),
  })
}
