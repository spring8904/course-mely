import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DndContext, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { motion } from 'framer-motion'
import {
  CircleHelp,
  CirclePlay,
  CirclePlus,
  CircleX,
  FileCode2,
  FileDown,
  FileUp,
  ScrollText,
  SquarePen,
  Trash2,
  Video,
} from 'lucide-react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import { IChapter, ILesson, LessonType } from '@/types'
import { cn } from '@/lib/utils'
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
import { Button, buttonVariants } from '@/components/ui/button'
import DraggableHandle from '@/sections/instructor/_components/courses-update/_components/draggable-handle'
import DraggableItem from '@/sections/instructor/_components/courses-update/lesson/_components/draggable-item'
import LessonDocument from '@/sections/instructor/_components/courses-update/lesson/_components/lesson-document'
import LessonQuiz from '@/sections/instructor/_components/courses-update/lesson/_components/lesson-quiz'
import LessonVideo from '@/sections/instructor/_components/courses-update/lesson/_components/lesson-video'
import AddQuestionDialog from '@/sections/instructor/_components/courses-update/lesson/_components/quiz/add-question-dialog'
import ImportQuestion from '@/sections/instructor/_components/courses-update/lesson/_components/quiz/import-question'
import CreateLesson from '@/sections/instructor/_components/courses-update/lesson/create-lesson'

export interface DraggableContentProps {
  chapter: IChapter
  slug: string
  onHide?: () => void
  courseStatus?: string
}

const DraggableContent = ({
  chapter,
  slug,
  // onHide,
  courseStatus,
}: DraggableContentProps) => {
  const router = useRouter()

  const typeIndexMap = { video: 0, document: 0, quiz: 0, coding: 0 }

  const [addNewLesson, setAddNewLesson] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<LessonType>()
  const [lessonList, setLessonList] = useState<ILesson[]>([])
  const [lessonEdit, setLessonEdit] = useState<number | null>(null)

  const [isOpenAddQuestion, setIsOpenAddQuestion] = useState(false)
  const [isOpenImportQuestion, setIsOpenImportQuestion] = useState(false)
  const [quizId, setQuizId] = useState<string | undefined>(undefined)

  const { mutate: updateLessonOrder, isPending: isUpdateOrder } =
    useUpdateOrderLesson()
  const { mutate: deleteLesson } = useDeleteLesson()

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over?.id) {
      const activeIndex = lessonList.findIndex(({ id }) => id === active.id)
      const overIndex = lessonList.findIndex(({ id }) => id === over.id)

      const newLesson = arrayMove(lessonList, activeIndex, overIndex)
      setLessonList(newLesson)

      const payload = newLesson
        .filter((lesson) => lesson.id !== undefined)
        .map((lesson, index) => ({
          id: lesson.id as number,
          order: index + 1,
        }))

      updateLessonOrder({ slug, lessons: payload })
    }
  }

  useEffect(() => {
    setLessonList(chapter?.lessons || [])
  }, [chapter.lessons])

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
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext
          items={lessonList.map((lesson) => lesson.id as UniqueIdentifier)}
        >
          {lessonList.map((lesson) => {
            typeIndexMap[lesson.type]++
            return (
              <DraggableItem
                key={lesson.id}
                id={lesson.id}
                disabled={isUpdateOrder}
              >
                <Accordion
                  type="single"
                  collapsible
                  key={lesson.id}
                  className="mb-3"
                >
                  <AccordionItem
                    onClick={(e) => e.stopPropagation()}
                    value={`lesson-${lesson.id}`}
                  >
                    <AccordionTrigger
                      onClick={(e) => {
                        if (!lessonEdit || lessonEdit !== lesson.id) {
                          e.stopPropagation()
                          setLessonEdit(lesson.id as number)
                        }
                      }}
                      className="rounded-lg"
                    >
                      <div className="flex w-full items-center gap-3 text-sm font-semibold">
                        <div className="flex w-full items-center gap-4">
                          <>
                            <div className="flex items-center gap-2">
                              {(() => {
                                switch (lesson?.type) {
                                  case 'video':
                                    return (
                                      <CirclePlay className="size-4 shrink-0" />
                                    )
                                  case 'document':
                                    return (
                                      <ScrollText className="size-4 shrink-0" />
                                    )
                                  case 'quiz':
                                    return (
                                      <CircleHelp className="size-4 shrink-0" />
                                    )
                                  case 'coding':
                                    return (
                                      <FileCode2 className="size-4 shrink-0" />
                                    )
                                  default:
                                    return (
                                      <SquarePen className="size-4 shrink-0" />
                                    )
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
                                <span
                                  className="flex size-8 items-center justify-center rounded-md border border-[#131316]"
                                  onClick={() => {
                                    setLessonEdit(lesson.id as number)
                                    if (lesson.type === 'coding') {
                                      router.push(
                                        `/course/${lesson.slug}/coding-exercise?coding=${lesson.lessonable_id}`
                                      )
                                    }
                                  }}
                                >
                                  <SquarePen size={14} />
                                </span>
                                <span
                                  className="flex size-8 items-center justify-center rounded-md border border-[#131316]"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteLesson(lesson.id as number)
                                  }}
                                >
                                  <Trash2 size={14} />
                                </span>
                              </div>
                            )}
                          </>
                          <div className="ml-auto mr-4 flex items-center gap-2">
                            {lesson.type === 'quiz' && (
                              <div className="flex gap-2">
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDownloadQuizForm()
                                  }}
                                  variant="default"
                                  className="bg-[#FFF7ED] p-2 text-xs text-primary shadow hover:text-white"
                                  disabled={
                                    courseStatus !== 'draft' &&
                                    courseStatus !== 'rejected'
                                  }
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
                                  disabled={
                                    courseStatus !== 'draft' &&
                                    courseStatus !== 'rejected'
                                  }
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
                                  disabled={
                                    courseStatus !== 'draft' &&
                                    courseStatus !== 'rejected'
                                  }
                                >
                                  Thêm câu hỏi
                                </Button>
                              </div>
                            )}
                            <DraggableHandle />
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    {lessonEdit === lesson.id && (
                      <AccordionContent className="mt-2 space-y-3 rounded-lg p-4">
                        {(() => {
                          switch (lesson?.type) {
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
                                <LessonQuiz
                                  courseStatus={courseStatus as string}
                                  isEdit={lessonEdit === lesson.id}
                                  chapterId={chapter ? String(chapter.id) : ''}
                                  onHide={() => setLessonEdit(null)}
                                  quizId={
                                    lesson.lessonable_id as string | undefined
                                  }
                                />
                              )
                            case 'coding':
                              return 'Bài tập'
                            default:
                              return 'Bài giảng'
                          }
                        })()}{' '}
                      </AccordionContent>
                    )}
                  </AccordionItem>
                </Accordion>
              </DraggableItem>
            )
          })}
        </SortableContext>
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <Link
              href={`/course/${slug}/coding-exercise`}
              className={cn(buttonVariants({ variant: 'outline' }))}
            >
              Coding
            </Link>

            <Button
              disabled={courseStatus !== 'draft' && courseStatus !== 'rejected'}
              onClick={() => {
                setAddNewLesson((prev) => !prev)
                setSelectedLesson(undefined)
              }}
              variant={addNewLesson ? 'secondary' : 'default'}
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
              <div className="mt-4 flex justify-evenly rounded-lg border border-dashed p-2">
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
      </DndContext>

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

export default DraggableContent
