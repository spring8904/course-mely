import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Check, Loader2, Pencil, Trash, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import { LessonQuizPayload, lessonQuizSchema } from '@/validations/lesson'
import QUERY_KEY from '@/constants/query-key'
import { useCreateLessonQuiz } from '@/hooks/instructor/lesson/useLesson'
import { useDeleteQuestion, useGetQuiz } from '@/hooks/instructor/quiz/useQuiz'

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
import AddQuestionDialog from '@/sections/instructor/_components/courses-update/lesson/_components/quiz/add-question-dialog'

type Props = {
  chapterId?: string
  onHide: () => void
  isEdit?: boolean
  quizId?: string
}

const LessonQuiz = ({ chapterId, onHide, isEdit, quizId }: Props) => {
  const queryClient = useQueryClient()

  const [editQuestion, setEditQuestion] = useState(false)

  const [questions, setQuestions] = useState<any[]>([])
  const [editQuestionId, setEditQuestionId] = useState<string | null>(null)

  const { data: questionData, isLoading: isQuestionLoading } = useGetQuiz(
    quizId as string
  )
  const { mutate: createLessonQuiz, isPending: isLessonQuizCreatePending } =
    useCreateLessonQuiz()
  const { mutate: deleteQuestion } = useDeleteQuestion()

  const form = useForm<LessonQuizPayload>({
    resolver: zodResolver(lessonQuizSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  useEffect(() => {
    if (questionData) {
      setQuestions(questionData.data.questions)
    }
    if (isEdit && questionData) {
      form.reset({
        title: questionData.data.title || '',
        content: questionData.data.content || '',
      })
    }
  }, [isEdit, questionData, form])

  const handleClose = () => {
    onHide()
  }

  const handleDeleteQuestion = (questionId: string) => {
    Swal.fire({
      title: 'Xác nhận xóa câu hỏi',
      text: 'Bạn có chắc muốn xoá câu hỏi này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        await deleteQuestion(questionId)
      }
    })
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

  if (isQuestionLoading) {
    return <Loader2 />
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4 flex justify-between">
            <h2 className="font-semibold">
              {isEdit ? 'Cập nhật' : 'Thêm'} bài ôn tập trắc nghiệm
            </h2>
            <div className="flex items-center justify-end">
              <Button
                onClick={handleClose}
                className="mr-3"
                variant="secondary"
                type="button"
              >
                Huỷ
              </Button>
              <Button type="submit" disabled={isLessonQuizCreatePending}>
                {isLessonQuizCreatePending && (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                )}
                {isEdit ? 'Cập nhật' : 'Thêm bài học'}
              </Button>
            </div>
          </div>

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
                      value={field.value}
                      onEditorChange={field.onChange}
                      minimalist
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      {isEdit && (
        <div className="my-2">
          <h4 className="text-sm">Danh sách câu hỏi</h4>
          {questionData?.data.questions.map((question: any, index: number) => (
            <div key={index} className="mt-2 rounded-lg border p-2">
              <div className="flex justify-between">
                <p className="text-sm">
                  {index + 1}. {question.question}
                </p>
                <div className="flex gap-2">
                  <div
                    onClick={() => {
                      setEditQuestion(true)
                      setEditQuestionId(question.id)
                    }}
                    className="cursor-pointer rounded border bg-[#fff3] p-2 shadow hover:bg-[#ffffff54]"
                  >
                    <Pencil size={12} />
                  </div>
                  <div
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="cursor-pointer rounded border bg-[#fff3] p-2 shadow hover:bg-[#ffffff54]"
                  >
                    <Trash size={12} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-xs">
                {question.answers.map((answer: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <span>
                      {String.fromCharCode(65 + index)}. {answer.answer}
                    </span>
                    {answer.is_correct ? (
                      <Check className="size-4 text-green-500" />
                    ) : (
                      <X className="size-4 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {editQuestion && (
        <AddQuestionDialog
          quizId={quizId as string}
          isOpen={editQuestion}
          isEdit={editQuestion}
          onOpenChange={setEditQuestion as any}
          questionId={editQuestionId as string}
        />
      )}
    </>
  )
}

export default LessonQuiz
