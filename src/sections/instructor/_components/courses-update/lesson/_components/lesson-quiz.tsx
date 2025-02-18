import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { LessonQuizPayload, lessonQuizSchema } from '@/validations/lesson'
import QUERY_KEY from '@/constants/query-key'
import { useCreateLessonQuiz } from '@/hooks/instructor/lesson/useLesson'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import TinyEditor from '@/components/shared/tiny-editor'

type Props = {
  chapterId?: string
  onHide: () => void
}

const LessonQuiz = ({ chapterId, onHide }: Props) => {
  const queryClient = useQueryClient()

  const { mutate: createLessonQuiz, isPending: isLessonQuizCreatePending } =
    useCreateLessonQuiz()

  const form = useForm<LessonQuizPayload>({
    resolver: zodResolver(lessonQuizSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  const handleClose = () => {
    onHide()
  }

  const onSubmit = (data: LessonQuizPayload) => {
    createLessonQuiz(
      {
        chapterId: chapterId as string,
        payload: data,
      },
      {
        onSuccess: async (res: any) => {
          await queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
          })
          handleClose()
          form.reset()
          onHide()

          toast.success(res.message)
        },
        onError: (error: any) => {
          toast.error(error.message || 'Có lỗi xảy ra')
        },
      }
    )
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="font-semibold">Thêm bài ôn tập trắc nghiệm</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề bài giảng</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tiêu đề bài giảng" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-2">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung bài giảng</FormLabel>
                  <FormControl>
                    <TinyEditor
                      onEditorChange={(value: string) => {
                        form.setValue('content', value)
                      }}
                      minimalist
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4 flex items-center justify-end">
            <Button onClick={handleClose} className="mr-3" variant="secondary">
              Huỷ
            </Button>
            <Button type="submit" disabled={isLessonQuizCreatePending}>
              {isLessonQuizCreatePending && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}
              Thêm bài học
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default LessonQuiz
