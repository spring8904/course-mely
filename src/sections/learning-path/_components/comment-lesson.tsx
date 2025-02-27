import React, { useState } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { Loader2, MessageCircleMore } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { FiMessageCircle, FiThumbsUp } from 'react-icons/fi'
import { toast } from 'react-toastify'

import {
  LessonCommentPayload,
  lessonCommentSchema,
} from '@/validations/comment'
import QUERY_KEY from '@/constants/query-key'
import { timeAgo } from '@/lib/common'
import {
  useGetLessonComments,
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
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import HtmlRenderer from '@/components/shared/html-renderer'
import QuillEditor from '@/components/shared/quill-editor'

const CommentLesson = ({ lessonId }: { lessonId: string }) => {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()

  const [isAdding, setIsAdding] = useState(false)
  const [selectedComment, setSelectedComment] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState<string>('')
  const [selectedEmoji, setSelectedEmoji] = useState<string>('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const { mutate: storeLessonComment, isPending } = useStoreCommentLesson()
  const {
    mutate: storeReplyLessonComment,
    isPending: isPendingStoreReplyLessonComment,
  } = useStoreReplyCommentLesson()
  const { data: lessonCommentData, isLoading: isLoadingLessonCommentData } =
    useGetLessonComments(lessonId)

  const form = useForm<LessonCommentPayload>({
    resolver: zodResolver(lessonCommentSchema),
    defaultValues: {
      content: '',
    },
  })

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setSelectedEmoji(emojiData.emoji)
    setShowEmojiPicker(false)
    console.log(`Emoji đã chọn: ${emojiData.emoji}`)
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
    setSelectedComment(null)
    setReplyContent('')
  }

  return (
    <>
      <Sheet>
        <Button asChild className="text-lg [&_svg]:size-5">
          <SheetTrigger>
            <MessageCircleMore />
            Hỏi đáp
          </SheetTrigger>
        </Button>
        <SheetContent className="w-[760px] sm:max-w-none">
          <SheetHeader>
            <SheetTitle>Hỏi đáp?</SheetTitle>
            <SheetDescription>
              Hãy để lại những thắc mắc của bạn để chúng ta cùng nhau xử lý.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 flex max-h-[70vh] flex-col gap-2 overflow-y-auto pr-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user?.avatar || ''} alt={user?.name} />
                <AvatarFallback>{user?.name || 'Avatar'}</AvatarFallback>
              </Avatar>
              <div className="w-full">
                {!isAdding ? (
                  <Input
                    placeholder="Nhập bình luận mới của bạn"
                    type="text"
                    onFocus={() => setIsAdding(true)}
                  />
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
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
                                className="min-h-[120px]"
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
                        >
                          Hủy
                        </Button>
                        <Button type="submit">
                          {isPending ? (
                            <>
                              <Loader2 className="mx-auto size-8 animate-spin" />{' '}
                              Loading...
                            </>
                          ) : (
                            'Bình luận'
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </div>
            </div>
            <div className="mt-2">
              <span>18 bình luận</span>
              {isLoadingLessonCommentData ? (
                <Loader2 className="mt-2 size-8 animate-spin" />
              ) : (
                <>
                  {lessonCommentData?.data.map((data: any, index: string) => (
                    <div className="mt-4" key={index}>
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage
                            src={data?.user.avatar || ''}
                            alt={data?.user.name}
                          />
                          <AvatarFallback>
                            {data?.user.name || 'Avatar'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex gap-2">
                          <p>{data?.user.name || ''}</p>
                          <span>{timeAgo(data?.created_at || '')}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <HtmlRenderer html={data?.content || ''} />
                      </div>
                      <div className="mt-4 flex items-center gap-4">
                        <div>
                          <button
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-500"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          >
                            <FiThumbsUp className="text-lg" />
                            {selectedEmoji || 'Thích'}
                          </button>
                          {showEmojiPicker && (
                            <div className="absolute z-50 mt-2">
                              <EmojiPicker
                                onEmojiClick={handleEmojiClick}
                                lazyLoadEmojis={true}
                              />
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            setSelectedComment(data.id)
                            setReplyContent(`@${data?.user?.name} `)
                          }}
                          className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500"
                        >
                          <FiMessageCircle className="text-lg" />
                          Phản hồi
                        </button>
                      </div>
                      {selectedComment === data.id && (
                        <div className="mt-4 flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage
                                src={data.user.avatar || ''}
                                alt={data.user.name}
                              />
                              <AvatarFallback>
                                {data.user.name || 'Avatar'}
                              </AvatarFallback>
                            </Avatar>
                            <p className="text-sm text-gray-600">
                              Phản hồi tới {data.user.name}
                            </p>
                          </div>
                          <QuillEditor
                            theme="snow"
                            value={replyContent}
                            onChange={(content) => setReplyContent(content)}
                            placeholder={`Phản hồi bình luận của ${data.user.name}...`}
                          />
                          <div className="mt-2 flex justify-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSelectedComment(null)
                                setReplyContent('')
                              }}
                            >
                              Hủy
                            </Button>
                            <Button
                              onClick={() => {
                                if (replyContent.trim())
                                  handleReplySubmit(data.id)
                              }}
                            >
                              Phản hồi
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
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
