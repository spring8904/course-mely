'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
// import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import {
  Loader2,
  MessageCircleMore,
  Send,
  Smile,
  Trash2,
  X,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { FiMoreHorizontal } from 'react-icons/fi'
import { toast } from 'react-toastify'

import {
  LessonCommentPayload,
  lessonCommentSchema,
  ReplyLessonCommentPayload,
  replyLessonCommentSchema,
} from '@/validations/comment'
import QUERY_KEY from '@/constants/query-key'
import { timeAgo } from '@/lib/common'
import {
  useGetLessonComments,
  useGetReplyLessonComment,
  useStoreCommentLesson,
  useStoreReplyCommentLesson,
} from '@/hooks/comment-lesson/useComment'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import HtmlRenderer from '@/components/shared/html-renderer'
import QuillEditor from '@/components/shared/quill-editor'

const reactionEmojis = [
  { emoji: '👍', name: 'Thích' },
  { emoji: '❤️', name: 'Yêu thích' },
  { emoji: '😆', name: 'Haha' },
  { emoji: '😮', name: 'Wow' },
  { emoji: '😢', name: 'Buồn' },
  { emoji: '😡', name: 'Phẫn nộ' },
]
const CommentLesson = ({ lessonId }: { lessonId: string }) => {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  // const emojiPickerRef = useRef<HTMLDivElement>(null)
  const reactionPickerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [isAdding, setIsAdding] = useState(false)
  const [selectedComment, setSelectedComment] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState<string>('')

  const [commentReactions, setCommentReactions] = useState<
    Record<string, string>
  >({})
  const [replyReactions, setReplyReactions] = useState<Record<string, string>>(
    {}
  )

  const [showReactionPicker, setShowReactionPicker] = useState<{
    id: string
    type: 'comment' | 'reply'
  } | null>(null)

  const [openDropdown, setOpenDropdown] = useState<{
    id: string
    type: 'comment' | 'reply'
  } | null>(null)

  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const { mutate: storeLessonComment, isPending } = useStoreCommentLesson()
  const {
    mutate: storeReplyLessonComment,
    isPending: isPendingStoreReplyLessonComment,
  } = useStoreReplyCommentLesson()

  const { data: lessonCommentData, isLoading: isLoadingLessonCommentData } =
    useGetLessonComments(lessonId)

  const { data: lessonReplyCommentData, isLoading: isLoadingReplyCommentData } =
    useGetReplyLessonComment(selectedComment || '')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        reactionPickerRef.current &&
        !reactionPickerRef.current.contains(event.target as Node)
      ) {
        setShowReactionPicker(null)
      }

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const form = useForm<LessonCommentPayload>({
    resolver: zodResolver(lessonCommentSchema),
    defaultValues: {
      content: '',
    },
  })

  const replyForm = useForm<ReplyLessonCommentPayload>({
    resolver: zodResolver(replyLessonCommentSchema),
    defaultValues: {
      content: '',
    },
  })

  const handleReactionClick = (
    emoji: string,
    id: string,
    type: 'comment' | 'reply'
  ) => {
    if (type === 'comment') {
      setCommentReactions((prev) => ({
        ...prev,
        [id]: emoji,
      }))
    } else {
      setReplyReactions((prev) => ({
        ...prev,
        [id]: emoji,
      }))
    }

    setShowReactionPicker(null)
    toast.success(`Đã thêm cảm xúc ${emoji}`)
  }

  const handleDeleteComment = (id: string, type: 'comment' | 'reply') => {
    toast.success(
      `Đã xóa ${type === 'comment' ? 'bình luận' : 'phản hồi'} thành công`
    )
    setOpenDropdown(null)

    if (type === 'comment') {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.LESSON_COMMENT, lessonId],
      })
    } else if (type === 'reply' && selectedComment) {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.LESSON_COMMENT, selectedComment],
      })
    }
  }

  const onSubmit = (values: LessonCommentPayload) => {
    const payload: LessonCommentPayload = {
      ...values,
      lesson_id: lessonId,
    }

    storeLessonComment(payload, {
      onSuccess: async (res: any) => {
        toast.success(res.message)
        form.reset()
        setIsAdding(false)

        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.LESSON_COMMENT, lessonId],
        })
      },
      onError: (error: any) => {
        toast.error(error.message)
      },
    })
  }

  const handleReplySubmit = (commentId: string) => {
    if (!replyContent.trim()) {
      toast.error('Nội dung phản hồi không được để trống')
      return
    }

    const payload: ReplyLessonCommentPayload = {
      content: replyContent,
    }

    storeReplyLessonComment(
      { commentId, data: payload },
      {
        onSuccess: async (res: any) => {
          toast.success(res.message || 'Đã phản hồi bình luận thành công')
          setReplyContent('')

          await queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.LESSON_COMMENT, lessonId],
          })

          await queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.LESSON_COMMENT, commentId],
          })
        },
        onError: (error: any) => {
          toast.error(error.message || 'Có lỗi xảy ra khi phản hồi bình luận')
        },
      }
    )
  }

  const renderReplies = (commentId: string) => {
    if (selectedComment !== commentId) return null

    if (isLoadingReplyCommentData) {
      return (
        <div className="ml-12 mt-2 flex items-center text-gray-500">
          <Loader2 className="mr-2 size-4 animate-spin" /> Đang tải phản hồi...
        </div>
      )
    }

    if (
      !lessonReplyCommentData?.data ||
      !Array.isArray(lessonReplyCommentData.data) ||
      lessonReplyCommentData.data.length === 0
    ) {
      return (
        <div className="ml-12 mt-2 text-sm text-gray-500">
          Chưa có phản hồi nào
        </div>
      )
    }

    return (
      <div className="ml-12 mt-4 space-y-4 border-l-2 border-blue-50 pl-4">
        {lessonReplyCommentData.data.map((reply: any, replyIndex: number) => (
          <div key={`reply-${replyIndex}`} className="animate-fade-in mt-2">
            <div className="flex gap-2">
              <Avatar className="size-8">
                <AvatarImage
                  src={reply?.user?.avatar || ''}
                  alt={reply?.user?.name || 'User Avatar'}
                />
                <AvatarFallback className="bg-blue-100 text-blue-800">
                  {reply?.user?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="rounded-2xl bg-gray-50 px-3 py-2">
                  <div className="font-medium text-gray-900">
                    {reply?.user?.name || 'Anonymous'}
                  </div>
                  <div className="mt-1 text-gray-800">
                    <HtmlRenderer
                      html={reply?.content || 'No content available'}
                    />
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-4 pl-2 text-xs">
                  <div className="relative">
                    <button
                      className={`font-medium ${replyReactions[reply?.id] ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
                      onClick={() =>
                        setShowReactionPicker(
                          showReactionPicker?.id === reply?.id &&
                            showReactionPicker?.type === 'reply'
                            ? null
                            : { id: reply?.id, type: 'reply' }
                        )
                      }
                    >
                      {replyReactions[reply?.id] || 'Thích'}
                    </button>

                    {showReactionPicker?.id === reply?.id &&
                      showReactionPicker?.type === 'reply' && (
                        <div
                          ref={reactionPickerRef}
                          className="animate-fade-in absolute -top-12 left-0 z-50 flex items-center gap-1 rounded-full bg-white p-1 shadow-lg"
                        >
                          {reactionEmojis.map((reaction) => (
                            <button
                              key={reaction.emoji}
                              className="rounded-full p-2 transition-transform hover:scale-125"
                              onClick={() =>
                                handleReactionClick(
                                  reaction.emoji,
                                  reply?.id,
                                  'reply'
                                )
                              }
                              title={reaction.name}
                            >
                              <span className="text-xl">{reaction.emoji}</span>
                            </button>
                          ))}
                        </div>
                      )}
                  </div>
                  <button className="font-medium text-gray-500 hover:text-blue-500">
                    Phản hồi
                  </button>
                  <span className="text-gray-500">
                    {timeAgo(reply?.created_at || '')}
                  </span>

                  <div className="relative ml-auto">
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown?.id === reply?.id &&
                            openDropdown?.type === 'reply'
                            ? null
                            : { id: reply?.id, type: 'reply' }
                        )
                      }
                    >
                      <FiMoreHorizontal />
                    </button>

                    {openDropdown?.id === reply?.id &&
                      openDropdown?.type === 'reply' && (
                        <div
                          ref={dropdownRef}
                          className="animate-fade-in absolute right-0 top-6 z-50 w-40 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                        >
                          <button
                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                            onClick={() =>
                              handleDeleteComment(reply?.id, 'reply')
                            }
                          >
                            <Trash2 className="size-4" />
                            Xóa phản hồi
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-white transition-colors hover:bg-blue-700">
            <MessageCircleMore className="size-5" />
            <span className="font-medium">Hỏi đáp</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[500px] max-w-full sm:w-[600px] sm:max-w-none md:w-[760px]">
          <div className="flex items-center justify-between">
            <SheetHeader className="text-left">
              <SheetTitle className="text-2xl font-bold text-blue-700">
                Hỏi đáp
              </SheetTitle>
              <SheetDescription className="text-gray-600">
                Hãy để lại những thắc mắc của bạn để chúng ta cùng nhau xử lý.
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <button className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700">
                <X className="size-5" />
              </button>
            </SheetClose>
          </div>

          <div className="mt-6 flex max-h-[75vh] flex-col gap-2 overflow-y-auto pr-2">
            <div className="flex gap-3">
              <Avatar className="size-10">
                <AvatarImage src={user?.avatar || ''} alt={user?.name} />
                <AvatarFallback className="bg-blue-100 text-blue-800">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 rounded-3xl bg-gray-50 p-2">
                {!isAdding ? (
                  <div
                    className="cursor-text px-4 py-3 text-gray-500 hover:text-gray-700"
                    onClick={() => setIsAdding(true)}
                  >
                    Nhập bình luận mới của bạn...
                  </div>
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-3"
                    >
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <QuillEditor
                                theme="snow"
                                {...field}
                                value={field.value || ''}
                                placeholder="Nhập bình luận của bạn..."
                                className="min-h-[100px] rounded-xl border-0 bg-transparent"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          type="reset"
                          variant="outline"
                          onClick={() => setIsAdding(false)}
                          disabled={isPending}
                          className="rounded-full"
                        >
                          Hủy
                        </Button>
                        <Button
                          type="submit"
                          disabled={isPending}
                          className="rounded-full bg-blue-600 hover:bg-blue-700"
                        >
                          {isPending ? (
                            <>
                              <Loader2 className="mr-2 size-4 animate-spin" />
                              Đang gửi...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 size-4" />
                              Bình luận
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="font-medium text-gray-700">
                  {lessonCommentData?.data?.length || 0} bình luận
                </span>
                <span className="text-sm text-gray-500">
                  Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé
                </span>
              </div>

              {isLoadingLessonCommentData ? (
                <div className="mt-8 flex flex-col items-center justify-center py-10">
                  <Loader2 className="size-10 animate-spin text-blue-600" />
                  <p className="mt-4 text-gray-500">Đang tải bình luận...</p>
                </div>
              ) : (
                <>
                  {Array.isArray(lessonCommentData?.data) &&
                  lessonCommentData.data.length > 0 ? (
                    lessonCommentData.data.map(
                      (comment: any, index: number) => (
                        <div
                          className="mt-6 border-b border-gray-100 pb-6"
                          key={comment?.id || index.toString()}
                        >
                          <div className="flex gap-3">
                            <Avatar className="size-10">
                              <AvatarImage
                                src={comment?.user?.avatar || ''}
                                alt={comment?.user?.name || 'User Avatar'}
                              />
                              <AvatarFallback className="bg-blue-100 text-blue-800">
                                {comment?.user?.name?.charAt(0) || 'A'}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="rounded-2xl bg-gray-50 px-4 py-3">
                                <div className="font-medium text-gray-900">
                                  {comment?.user?.name || 'Anonymous'}
                                </div>
                                <div className="mt-1 text-gray-800">
                                  <HtmlRenderer
                                    html={
                                      comment?.content || 'No content available'
                                    }
                                  />
                                </div>
                              </div>

                              <div className="mt-2 flex items-center gap-4 pl-2 text-sm">
                                <div className="relative">
                                  <button
                                    className={`flex items-center gap-1 font-medium ${commentReactions[comment?.id] ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                                    onClick={() =>
                                      setShowReactionPicker(
                                        showReactionPicker?.id ===
                                          comment?.id &&
                                          showReactionPicker?.type === 'comment'
                                          ? null
                                          : { id: comment?.id, type: 'comment' }
                                      )
                                    }
                                  >
                                    <Smile className="size-4" />
                                    {commentReactions[comment?.id] || 'Thích'}
                                  </button>

                                  {showReactionPicker?.id === comment?.id &&
                                    showReactionPicker?.type === 'comment' && (
                                      <div
                                        ref={reactionPickerRef}
                                        className="animate-fade-in absolute -top-12 left-0 z-50 flex items-center gap-1 rounded-full bg-white p-1 shadow-lg"
                                      >
                                        {reactionEmojis.map((reaction) => (
                                          <button
                                            key={reaction.emoji}
                                            className="rounded-full p-2 transition-transform hover:scale-125"
                                            onClick={() =>
                                              handleReactionClick(
                                                reaction.emoji,
                                                comment?.id,
                                                'comment'
                                              )
                                            }
                                            title={reaction.name}
                                          >
                                            <span className="text-xl">
                                              {reaction.emoji}
                                            </span>
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                </div>

                                <button
                                  onClick={() => {
                                    // Toggle reply section
                                    setSelectedComment(
                                      selectedComment === comment?.id
                                        ? null
                                        : comment?.id
                                    )
                                    if (selectedComment !== comment?.id) {
                                      setReplyContent(
                                        `@${comment?.user?.name || ''} `
                                      )
                                    }
                                  }}
                                  className="flex items-center gap-1 font-medium text-gray-500 hover:text-blue-600"
                                >
                                  <MessageCircleMore className="size-4" />
                                  Phản hồi
                                </button>

                                <span className="flex items-center text-gray-500">
                                  {timeAgo(comment?.created_at || '')}
                                </span>

                                <div className="relative ml-auto">
                                  <button
                                    className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                    onClick={() =>
                                      setOpenDropdown(
                                        openDropdown?.id === comment?.id &&
                                          openDropdown?.type === 'comment'
                                          ? null
                                          : { id: comment?.id, type: 'comment' }
                                      )
                                    }
                                  >
                                    <FiMoreHorizontal className="size-4" />
                                  </button>

                                  {openDropdown?.id === comment?.id &&
                                    openDropdown?.type === 'comment' && (
                                      <div
                                        ref={dropdownRef}
                                        className="animate-fade-in absolute right-0 top-8 z-50 w-40 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                                      >
                                        <button
                                          className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                                          onClick={() =>
                                            handleDeleteComment(
                                              comment?.id,
                                              'comment'
                                            )
                                          }
                                        >
                                          <Trash2 className="size-4" />
                                          Xóa bình luận
                                        </button>
                                      </div>
                                    )}
                                </div>
                              </div>

                              {renderReplies(comment?.id)}

                              {selectedComment === comment?.id && (
                                <div className="animate-fade-in ml-8 mt-3 flex gap-2">
                                  <Avatar className="size-8">
                                    <AvatarImage
                                      src={user?.avatar || ''}
                                      alt={user?.name || 'User Avatar'}
                                    />
                                    <AvatarFallback className="bg-blue-100 text-blue-800">
                                      {user?.name?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                  </Avatar>

                                  <div className="flex-1">
                                    <div className="rounded-2xl bg-gray-50 p-2">
                                      <QuillEditor
                                        theme="snow"
                                        value={replyContent}
                                        onChange={(content) =>
                                          setReplyContent(content)
                                        }
                                        placeholder={`Phản hồi bình luận của ${comment?.user?.name || 'người dùng'}...`}
                                        className="min-h-[80px] border-0 bg-transparent"
                                      />

                                      <div className="mt-2 flex justify-end gap-2">
                                        <Button
                                          variant="outline"
                                          onClick={() => {
                                            setSelectedComment(null)
                                            setReplyContent('')
                                          }}
                                          disabled={
                                            isPendingStoreReplyLessonComment
                                          }
                                          className="rounded-full"
                                        >
                                          Hủy
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            handleReplySubmit(comment?.id)
                                          }
                                          disabled={
                                            !replyContent.trim() ||
                                            isPendingStoreReplyLessonComment
                                          }
                                          className="rounded-full bg-blue-600 hover:bg-blue-700"
                                        >
                                          {isPendingStoreReplyLessonComment ? (
                                            <>
                                              <Loader2 className="mr-2 size-4 animate-spin" />
                                              Đang gửi...
                                            </>
                                          ) : (
                                            <>
                                              <Send className="mr-2 size-4" />
                                              Phản hồi
                                            </>
                                          )}
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div className="mt-10 flex flex-col items-center justify-center py-10 text-center">
                      <MessageCircleMore className="size-16 text-gray-300" />
                      <p className="mt-4 text-gray-500">
                        Chưa có bình luận nào.
                      </p>
                      <p className="text-sm text-gray-400">
                        Hãy là người đầu tiên bình luận!
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default CommentLesson
