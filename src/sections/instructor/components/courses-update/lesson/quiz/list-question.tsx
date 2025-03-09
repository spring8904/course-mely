'use client'

import { Button } from '@/components/ui/button'
import { useDeleteQuestion } from '@/hooks/instructor/quiz/useQuiz'
import AddQuestionDialog from '@/sections/instructor/components/courses-update/lesson/quiz/add-question-dialog'
import { instructorCourseApi } from '@/services/instructor/course/course-api'
import { useCourseStatusStore } from '@/stores/use-course-status-store'
import {
  Check,
  FileDown,
  FileUp,
  Loader2,
  Pencil,
  Trash,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import ImportQuestion from './import-question'

interface Props {
  questions?: any
  quizId: string
}

const ListQuestion = ({ questions = [], quizId }: Props) => {
  const { isDraftOrRejected } = useCourseStatusStore()

  const [editQuestionId, setEditQuestionId] = useState<string>()
  const [openEditQuestion, setOpenEditQuestion] = useState(false)

  const [isOpenAddQuestion, setIsOpenAddQuestion] = useState(false)
  const [isOpenImportQuestion, setIsOpenImportQuestion] = useState(false)

  const { mutate: deleteQuestion, isPending } = useDeleteQuestion()

  const handleDeleteQuestion = (questionId: string) => {
    Swal.fire({
      title: 'Xác nhận xóa câu hỏi',
      text: 'Bạn có chắc muốn xoá câu hỏi này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result: any) => {
      if (result.isConfirmed) {
        deleteQuestion(questionId, {
          onSettled: () => setEditQuestionId(undefined),
        })
      }
    })
  }

  const handleDownloadQuizForm = async () => {
    try {
      const res = await instructorCourseApi.downloadQuizForm()

      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'quiz_import_template.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error: any) {
      toast(error.message)
    }
  }
  return (
    <>
      {
        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={(e) => {
              e.stopPropagation()
              handleDownloadQuizForm()
            }}
            variant="default"
            className="bg-[#FFF7ED] p-2 text-xs text-primary shadow hover:text-white"
          >
            Mẫu Import
            <FileDown className="size-2" />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              setIsOpenImportQuestion(true)
            }}
            className="bg-[#FFF7ED] p-2 text-xs text-primary shadow hover:text-white"
          >
            Import câu hỏi
            <FileUp className="size-2" />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              setIsOpenAddQuestion(true)
            }}
            className="rounded-lg border bg-[#FFF7ED] p-2 text-xs text-primary shadow hover:text-white"
          >
            Thêm câu hỏi
          </Button>
        </div>
      }

      {questions.length > 0 && (
        <div className="my-2">
          <h4 className="text-sm">Danh sách câu hỏi</h4>
          {questions.map((question: any, index: number) => (
            <div key={index} className="mt-2 space-y-2 rounded-lg border p-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm">
                  {index + 1}. {question.question}
                </p>
                {isDraftOrRejected && (
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-7 [&_svg]:size-3"
                      disabled={isPending && editQuestionId === question.id}
                      onClick={() => {
                        setEditQuestionId(question.id)
                        setOpenEditQuestion(true)
                      }}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-7 [&_svg]:size-3"
                      disabled={isPending && editQuestionId === question.id}
                      onClick={() => {
                        setEditQuestionId(question.id)
                        handleDeleteQuestion(question.id)
                      }}
                    >
                      {isPending && editQuestionId === question.id ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Trash />
                      )}
                    </Button>
                  </div>
                )}
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

      <AddQuestionDialog
        isOpen={openEditQuestion}
        onOpenChange={(open) => {
          if (!open) setEditQuestionId(undefined)
          setOpenEditQuestion(open)
        }}
        questionId={editQuestionId}
      />

      <AddQuestionDialog
        isOpen={isOpenAddQuestion}
        onOpenChange={setIsOpenAddQuestion}
        quizId={quizId}
      />

      <ImportQuestion
        quizId={quizId}
        isOpenImportQuestion={isOpenImportQuestion}
        setIsOpenImportQuestion={setIsOpenImportQuestion}
      />
    </>
  )
}
export default ListQuestion
