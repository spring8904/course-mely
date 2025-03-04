import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UniqueIdentifier } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import {
  CircleHelp,
  CirclePlay,
  CirclePlus,
  CircleX,
  FileCode2,
  FileDown,
  FileUp,
  GripVertical,
  ScrollText,
  SquarePen,
  Trash2,
  Video,
} from 'lucide-react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import { IChapter, ILesson, LessonType } from '@/types'
import { instructorCourseApi } from '@/services/instructor/course/course-api'
import {
  useDeleteLesson,
  useUpdateOrderLesson,
} from '@/hooks/instructor/lesson/useLesson'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from '@/components/ui/sortable'
import CreateLesson from '@/sections/instructor/components/courses-update/lesson/create-lesson'
import LessonDocument from '@/sections/instructor/components/courses-update/lesson/lesson-document'
import LessonQuiz from '@/sections/instructor/components/courses-update/lesson/lesson-quiz'
import LessonVideo from '@/sections/instructor/components/courses-update/lesson/lesson-video'
import AddQuestionDialog from '@/sections/instructor/components/courses-update/lesson/quiz/add-question-dialog'
import ImportQuestion from '@/sections/instructor/components/courses-update/lesson/quiz/import-question'

export interface Props {
  chapter: IChapter
  slug: string
  onHide?: () => void
  courseStatus?: string
}

const SortableLesson = ({
  chapter,
  slug,
  // onHide,
  courseStatus,
}: Props) => {
  const router = useRouter()

  const typeIndexMap = { video: 0, document: 0, quiz: 0, coding: 0 }

  const [addNewLesson, setAddNewLesson] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<LessonType>()
  const [lessons, setLessons] = useState<ILesson[]>([])
  const [lessonEdit, setLessonEdit] = useState<number | null>(null)

  const [isOpenAddQuestion, setIsOpenAddQuestion] = useState(false)
  const [isOpenImportQuestion, setIsOpenImportQuestion] = useState(false)
  const [quizId, setQuizId] = useState<string | undefined>(undefined)

  const { mutate: updateLessonOrder, isPending: isUpdateOrder } =
    useUpdateOrderLesson()
  const { mutate: deleteLesson } = useDeleteLesson()

  useEffect(() => {
    setLessons(chapter?.lessons || [])
  }, [chapter.lessons])

  const onValueChange = (
    data: {
      id: UniqueIdentifier
      value: ILesson
    }[]
  ) => {
    const newLessons = data.map((item) => item.value)

    setLessons(newLessons)

    const payload = newLessons
      .filter((lesson) => lesson.id !== undefined)
      .map((lesson, index) => ({
        id: lesson.id as number,
        order: index + 1,
      }))

    updateLessonOrder({ slug, lessons: payload })
  }

  const handleDeleteLesson = (id: number) => {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc muốn xóa bài học này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteLesson({
          chapterId: chapter.id as number,
          id,
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

  // const handleCourseStatus = () => {
  //   if (courseStatus !== 'draft') {
  //     Swal.fire({
  //       title: 'Khoá học của bạn đang chờ duyệt hoặc đã được duyệt.',
  //       text: 'Bạn không thể thay đổi nội dung bài học.',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Xây dựng',
  //       cancelButtonText: 'Hủy',
  //     })
  //   }
  // }

  return (
    <>
      <Sortable
        value={lessons.map((lesson) => ({
          id: lesson.id as UniqueIdentifier,
          value: lesson,
        }))}
        onValueChange={onValueChange}
      >
        {lessons.map((lesson) => {
          typeIndexMap[lesson.type]++
          return (
            <SortableItem
              key={lesson.id}
              value={lesson.id!}
              disabled={isUpdateOrder}
              asChild
            >
              <Accordion type="single" collapsible className="mb-3">
                <AccordionItem
                  onClick={(e) => e.stopPropagation()}
                  value={`lesson-${lesson.id}`}
                >
                  <AccordionTrigger
                    className="space-x-4 rounded-lg py-2"
                    onClick={(e) => {
                      if (!lessonEdit || lessonEdit !== lesson.id) {
                        e.stopPropagation()
                        setLessonEdit(lesson.id as number)
                      }
                    }}
                    disabled={lesson.type === 'coding'}
                    hideArrow={lesson.type === 'coding'}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {(() => {
                          switch (lesson?.type) {
                            case 'video':
                              return <CirclePlay className="size-4 shrink-0" />
                            case 'document':
                              return <ScrollText className="size-4 shrink-0" />
                            case 'quiz':
                              return <CircleHelp className="size-4 shrink-0" />
                            case 'coding':
                              return <FileCode2 className="size-4 shrink-0" />
                            default:
                              return <SquarePen className="size-4 shrink-0" />
                          }
                        })()}
                        <div>
                          {(() => {
                            switch (lesson?.type) {
                              case 'video':
                                return 'Bài giảng'
                              case 'document':
                                return 'Tài liệu'
                              case 'quiz':
                                return 'Câu hỏi'
                              case 'coding':
                                return 'Bài tập'
                              default:
                                return 'Bài giảng'
                            }
                          })()}{' '}
                          {typeIndexMap[lesson?.type]}: {lesson.title}
                        </div>
                      </div>
                      {(courseStatus === 'draft' ||
                        courseStatus === 'rejected') && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setLessonEdit(lesson.id as number)
                              if (lesson.type === 'coding') {
                                router.push(
                                  `/course/${lesson.slug}/coding-exercise?coding=${lesson.lessonable_id}`
                                )
                              }
                            }}
                          >
                            <SquarePen />
                          </Button>

                          <SortableDragHandle>
                            <GripVertical />
                          </SortableDragHandle>

                          <Button
                            variant="outline"
                            size="icon"
                            className="text-destructive hover:text-destructive/80"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteLesson(lesson.id as number)
                            }}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      )}
                    </div>
                  </AccordionTrigger>
                  {lessonEdit === lesson.id &&
                    lesson.type &&
                    lesson.type !== 'coding' && (
                      <AccordionContent className="mt-2 space-y-3 rounded-lg p-4">
                        {(() => {
                          switch (lesson.type) {
                            case 'video':
                              return (
                                <LessonVideo
                                  courseStatus={courseStatus as string}
                                  isEdit={lessonEdit === lesson.id}
                                  chapterId={chapter ? String(chapter.id) : ''}
                                  onHide={() => setLessonEdit(null)}
                                  lessonId={lesson?.id}
                                />
                              )
                            case 'document':
                              return (
                                <LessonDocument
                                  courseStatus={courseStatus as string}
                                  lessonId={lesson?.id}
                                  chapterId={chapter ? String(chapter.id) : ''}
                                  onHide={() => setLessonEdit(null)}
                                />
                              )
                            case 'quiz':
                              return (
                                <>
                                  {courseStatus !== 'approved' && (
                                    <div className="flex w-full items-center gap-2">
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
                                          setQuizId(
                                            lesson?.lessonable_id as
                                              | string
                                              | undefined
                                          )
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
                                          setQuizId(
                                            lesson?.lessonable_id as
                                              | string
                                              | undefined
                                          )
                                        }}
                                        className="rounded-lg border bg-[#FFF7ED] p-2 text-xs text-primary shadow hover:text-white"
                                      >
                                        Thêm câu hỏi
                                      </Button>
                                    </div>
                                  )}

                                  <LessonQuiz
                                    courseStatus={courseStatus as string}
                                    isEdit={lessonEdit === lesson.id}
                                    chapterId={
                                      chapter ? String(chapter.id) : ''
                                    }
                                    onHide={() => setLessonEdit(null)}
                                    quizId={
                                      lesson.lessonable_id as string | undefined
                                    }
                                  />
                                </>
                              )
                          }
                        })()}{' '}
                      </AccordionContent>
                    )}
                </AccordionItem>
              </Accordion>
            </SortableItem>
          )
        })}
      </Sortable>

      <div className="mt-3 flex items-center gap-2">
        <Button
          disabled={courseStatus !== 'draft' && courseStatus !== 'rejected'}
          onClick={() => {
            setAddNewLesson((prev) => !prev)
            setSelectedLesson(undefined)
          }}
          variant={addNewLesson ? 'outline' : 'default'}
        >
          <motion.div
            animate={{ rotate: addNewLesson ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {addNewLesson ? <CircleX /> : <CirclePlus />}
          </motion.div>
          {addNewLesson ? 'Đóng' : 'Thêm bài học'}
        </Button>
      </div>

      <div className="mt-3">
        {addNewLesson &&
          (selectedLesson ? (
            <CreateLesson
              onHide={() => setSelectedLesson(undefined)}
              type={selectedLesson!}
              chapterId={String(chapter.id!)}
              onSuccess={() => {
                setAddNewLesson(false)
                setSelectedLesson(undefined)
              }}
              courseStatus={courseStatus}
            />
          ) : (
            <div className="grid gap-4 rounded-lg border border-dashed p-2 md:grid-cols-2 lg:grid-cols-4 xl:gap-8">
              <Button onClick={() => setSelectedLesson('video')}>
                <Video />
                Bài giảng
              </Button>
              <Button onClick={() => setSelectedLesson('document')}>
                <ScrollText />
                Tài liệu
              </Button>
              <Button onClick={() => setSelectedLesson('quiz')}>
                <CircleHelp />
                Câu hỏi
              </Button>
              <Button onClick={() => setSelectedLesson('coding')}>
                <FileCode2 />
                Bài tập
              </Button>
            </div>
          ))}
      </div>

      <AddQuestionDialog
        isOpen={isOpenAddQuestion}
        onOpenChange={setIsOpenAddQuestion}
        quizId={quizId as string}
      />
      <ImportQuestion
        quizId={quizId as string}
        isOpenImportQuestion={isOpenImportQuestion}
        setIsOpenImportQuestion={setIsOpenImportQuestion}
      />
    </>
  )
}

export default SortableLesson
