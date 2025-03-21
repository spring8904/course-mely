import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  blogCommentSchema,
  replyBlogCommentSchema,
} from '@/validations/comment'
import {
  useStoreCommentBlog,
  useStoreReplyCommentBlog,
} from '@/hooks/comment-blog/useCommentBlog'

interface CommentFormProps {
  postId?: string
  commentId?: string
  onSuccess?: () => void
  isReply?: boolean
  onCancel?: () => void
}

const CommentForm = ({
  postId,
  commentId,
  onSuccess,
  isReply = false,
  onCancel,
}: CommentFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isReply ? replyBlogCommentSchema : blogCommentSchema),
  })

  const storeComment = useStoreCommentBlog()
  const storeReply = useStoreReplyCommentBlog()

  const onSubmit = async (data: any) => {
    try {
      if (isReply && commentId) {
        await storeReply.mutateAsync({ commentId, data })
      } else {
        await storeComment.mutateAsync({ ...data, post_id: postId })
      }
      reset()
      if (onSuccess) onSuccess()
      if (onCancel) onCancel()
    } catch (error) {
      console.error('Error submitting comment:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
      <div className="mb-4 rounded-lg border border-gray-200 bg-white px-4 py-2">
        <textarea
          {...register('content')}
          rows={3}
          className="w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
          placeholder={isReply ? 'Viết phản hồi...' : 'Viết bình luận...'}
        />
      </div>
      {errors.content && (
        <p className="mb-2 text-sm text-red-500">
          {errors.content.message as string}
        </p>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200"
        >
          {isReply ? 'Gửi phản hồi' : 'Đăng bình luận'}
        </button>
        {isReply && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center rounded-lg bg-gray-100 px-4 py-2.5 text-center text-xs font-medium text-gray-900 hover:bg-gray-200 focus:ring-4 focus:ring-gray-200"
          >
            Hủy
          </button>
        )}
      </div>
    </form>
  )
}

export default CommentForm
