import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useGetBlogComments } from '@/hooks/comment-blog/useCommentBlog'
import { useAuthStore } from '@/stores/useAuthStore'
import CommentItem from '@/sections/blogs/_components/blog-detail/_components/comment'
import CommentForm from '@/sections/blogs/_components/blog-detail/_components/comment-form'

const INITIAL_COMMENT_LIMIT = 3

const BlogDetailReviewList = ({ postId }: { postId: string }) => {
  const { data: comments, isLoading, refetch } = useGetBlogComments(postId)
  const { user } = useAuthStore()
  const currentUserId = user?.id
  const [showAllComments, setShowAllComments] = useState(false)

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="animate-spin" />
      </div>
    )
  }
  const sortedComments = comments?.data?.length
    ? [...comments.data].sort(
        (a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    : []

  const displayedComments = showAllComments
    ? sortedComments
    : sortedComments?.slice(0, INITIAL_COMMENT_LIMIT)

  return (
    <div className="review-wrap w-full">
      <div className="review-title mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-medium">
          Bình luận {/*({comments?.data?.length || 0})*/}
        </h3>
      </div>

      <div className="mb-8">
        <CommentForm postId={postId} onSuccess={refetch} />
      </div>

      <div className="space-y-12">
        {sortedComments?.length > 0 ? (
          <>
            {displayedComments.map((comment: any) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                currentUserId={currentUserId}
                onReplySuccess={refetch}
                postId={postId}
              />
            ))}
            {sortedComments.length > INITIAL_COMMENT_LIMIT &&
              !showAllComments && (
                <button
                  onClick={() => setShowAllComments(true)}
                  className="w-full rounded-lg bg-gray-100 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Xem thêm {sortedComments.length - INITIAL_COMMENT_LIMIT} bình
                  luận
                </button>
              )}
          </>
        ) : (
          <p className="py-4 text-center text-gray-500">
            Bài viết này chưa có bình luận!
          </p>
        )}
      </div>
    </div>
  )
}

export default BlogDetailReviewList
