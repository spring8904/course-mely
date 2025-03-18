import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Trash2 } from 'lucide-react'
import { useDeleteCommentBlog } from '@/hooks/comment-blog/useCommentBlog'
import CommentForm from '@/sections/blogs/_components/blog-detail/_components/comment-form'

const INITIAL_REPLY_LIMIT = 3

interface CommentItemProps {
  comment: any
  currentUserId?: number
  onReplySuccess?: () => void
  postId: string
  rootCommentId?: string
}

const CommentItem = ({
  comment,
  currentUserId,
  onReplySuccess,
  postId,
  rootCommentId,
}: CommentItemProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [showAllReplies, setShowAllReplies] = useState(false)
  const deleteComment = useDeleteCommentBlog(comment.id.toString())

  const parentCommentId = rootCommentId || comment.id.toString()

  const handleDelete = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
      await deleteComment.mutateAsync()
    }
  }

  const timeAgo = formatDistanceToNow(new Date(comment.created_at), {
    addSuffix: true,
    locale: vi,
  })

  const sortedReplies = comment.replies?.length
    ? [...comment.replies].sort(
        (a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    : []

  const displayedReplies = showAllReplies
    ? sortedReplies
    : sortedReplies?.slice(0, INITIAL_REPLY_LIMIT)

  return (
    <div className="mb-6 w-full">
      <div className="flex items-start gap-4">
        <img
          src={comment.user.avatar}
          alt={comment.user.name}
          className="size-10 rounded-full"
        />
        <div className="flex-1">
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-2 flex w-full items-center justify-between">
              <span className="font-semibold">{comment.user.name}</span>
              <span className="text-sm text-gray-500">{timeAgo}</span>
            </div>
            <p className="text-gray-800">{comment.content}</p>
          </div>

          <div className="mt-2 flex gap-4">
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-sm text-gray-700 hover:text-blue-800"
            >
              Phản hồi
            </button>
            {comment.replies_count > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                {showReplies
                  ? 'Ẩn phản hồi'
                  : `Xem ${comment.replies_count} phản hồi`}
              </button>
            )}
            {currentUserId && currentUserId === comment.user.id && (
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>

          {showReplyForm && (
            <div className="mt-4">
              <CommentForm
                postId={postId}
                commentId={parentCommentId}
                isReply={true}
                onSuccess={() => {
                  setShowReplyForm(false)
                  if (onReplySuccess) onReplySuccess()
                }}
                onCancel={() => setShowReplyForm(false)}
              />
            </div>
          )}

          {showReplies && sortedReplies.length > 0 && (
            <div className="ml-8 mt-4 space-y-6">
              {displayedReplies.map((reply: any) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  currentUserId={currentUserId}
                  onReplySuccess={onReplySuccess}
                  postId={postId}
                  rootCommentId={parentCommentId}
                />
              ))}
              {sortedReplies.length > INITIAL_REPLY_LIMIT &&
                !showAllReplies && (
                  <button
                    onClick={() => setShowAllReplies(true)}
                    className="w-full rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  >
                    Xem thêm {sortedReplies.length - INITIAL_REPLY_LIMIT} phản
                    hồi
                  </button>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentItem
