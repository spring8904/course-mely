import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DndContext, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { Label } from '@radix-ui/react-label'
import { motion } from 'framer-motion'
import {
  CircleCheck,
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
  useUpdateContentLesson,
  useUpdateOrderLesson,
} from '@/hooks/instructor/lesson/useLesson'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import TinyEditor from '@/components/shared/tiny-editor'
import DraggableHandle from '@/sections/instructor/_components/courses-update/_components/draggable-handle'
import DraggableItem from '@/sections/instructor/_components/courses-update/lesson/_components/draggable-item'
import AddQuestionDialog from '@/sections/instructor/_components/courses-update/lesson/_components/quiz/add-question-dialog'
import CreateLesson from '@/sections/instructor/_components/courses-update/lesson/create-lesson'

export interface DraggableContentProps {
  chapter: IChapter
  slug: string
}

const DraggableContent = ({ chapter, slug }: DraggableContentProps) => {
  const router = useRouter()

  const typeIndexMap = { video: 0, document: 0, quiz: 0, coding: 0 }

  const [addNewLesson, setAddNewLesson] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<LessonType>()
  const [lessonList, setLessonList] = useState<ILesson[]>([])
  const [lessonEdit, setLessonEdit] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState<string>('')

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [videoUrl, setVideoUrl] = useState('')

  const [isOpenAddQuestion, setIsOpenAddQuestion] = useState(false)

  const { mutate } = useUpdateOrderLesson()
  const { mutate: updateContentLesson } = useUpdateContentLesson()
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

      mutate({ slug, lessons: payload })
    }
  }

  useEffect(() => {
    setLessonList(chapter?.lessons || [])
  }, [chapter.lessons])

  const handleUpdateContentLesson = (id: number) => {
    if (!editTitle.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng nhập tiêu đề',
      })

      return
    }

    if (editTitle !== lessonList.find((lesson) => lesson.id === id)?.title) {
      updateContentLesson(
        { chapterId: chapter.id as number, id, data: { title: editTitle } },
        {
          onSuccess: () => {
            setLessonEdit(null)
            setEditTitle('')
          },
        }
      )
    } else {
      setLessonEdit(null)
      setEditTitle('')
      toast.info('Dữ liệu không thay đổi')
    }
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

  const handleFileChange = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      const videoUrl = URL.createObjectURL(file)
      setVideoUrl(videoUrl)
    }
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleResetClick = () => {
    setSelectedFile(null)
    setVideoUrl('')
  }

  const handleDowloadQuizForm = async () => {
    try {
      const res = await instructorCourseApi.downloadQuizForm()

      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'QuizFormCourseMeLy.csv')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error: any) {
      toast(error.message)
    }
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <AccordionContent className="mt-3 rounded-lg p-4">
          <SortableContext
            items={lessonList.map((lesson) => lesson.id as UniqueIdentifier)}
          >
            {lessonList.map((lesson) => {
              typeIndexMap[lesson.type]++
              return (
                <DraggableItem key={lesson.id} id={lesson.id}>
                  <Accordion
                    type="single"
                    collapsible
                    key={lesson.id}
                    className="mb-3"
                  >
                    <AccordionItem value={`lesson-${lesson.id}`}>
                      <AccordionTrigger className="rounded-lg">
                        <div className="flex w-full items-center gap-3 text-sm font-semibold">
                          <div className="flex w-full items-center gap-4">
                            {lessonEdit === lesson.id ? (
                              <>
                                <div
                                  className="w-full"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Input
                                    placeholder="Nhập tên bài học"
                                    value={editTitle}
                                    onChange={(e) =>
                                      setEditTitle(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <span
                                    className="flex size-8 items-center justify-center rounded-md border border-[#131316]"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleUpdateContentLesson(
                                        lesson.id as number
                                      )
                                    }}
                                  >
                                    <CircleCheck size={14} />
                                  </span>
                                  <span
                                    className="flex size-8 items-center justify-center rounded-md border border-[#131316]"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setLessonEdit(null)
                                    }}
                                  >
                                    <CircleX size={14} />
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex items-center gap-2">
                                  {(() => {
                                    switch (lesson?.type) {
                                      case 'video':
                                        return <CirclePlay size={18} />
                                      case 'document':
                                        return <ScrollText size={18} />
                                      case 'quiz':
                                        return <CircleHelp size={18} />
                                      case 'coding':
                                        return <FileCode2 size={18} />
                                      default:
                                        return <SquarePen size={18} />
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
                                <div className="flex items-center gap-2">
                                  <span
                                    className="flex size-8 items-center justify-center rounded-md border border-[#131316]"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setLessonEdit(lesson.id as number)
                                      setEditTitle(lesson.title || '')
                                      if (lesson.type === 'coding') {
                                        router.push(
                                          `/course/${lesson.slug}/coding-exercise?coding=${lesson.id}`
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
                              </>
                            )}
                            <div className="ml-auto mr-4 flex items-center">
                              {lessonEdit !== lesson.id && (
                                <div className="flex gap-2">
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDowloadQuizForm()
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
                              )}
                              <DraggableHandle />
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 space-y-3 rounded-lg p-4">
                        <div className="space-y-2">
                          <Label>Loại nội dung</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn loại nội dung" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="video">Video</SelectItem>
                              <SelectItem value="document">Tài liệu</SelectItem>
                              <SelectItem value="quiz">Câu hỏi</SelectItem>
                              <SelectItem value="coding">
                                Bài tập Code
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label>Bài giảng</label>
                          {selectedFile ? (
                            <div className="flex flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-gray-300 p-5">
                              <video
                                src={videoUrl}
                                controls
                                loop
                                className="size-full rounded-lg object-cover"
                              />
                              <div className="mt-2 flex w-full items-center justify-between">
                                <p className="text-left text-sm font-medium">
                                  Đã chọn video: {selectedFile?.name || ''}
                                </p>
                                <button
                                  onClick={handleResetClick}
                                  type="button"
                                  className="rounded-lg border bg-red-500 px-6 py-2 font-medium text-white hover:bg-red-600"
                                >
                                  Tải lại
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-gray-300 p-5">
                              <span>
                                Tải dữ liệu video hoặc kéo thả vào đây
                              </span>
                              <button
                                type="button"
                                className="rounded-lg border border-black p-4 font-medium transition-all duration-300 ease-in-out hover:bg-[#404040] hover:text-white"
                                onClick={handleUploadClick}
                              >
                                Upload a video
                              </button>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept=".mp4,.avi,.mkv,.flv"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                              />
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label>Mô tả</Label>
                          <TinyEditor minimalist />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Xem trước</Button>
                          <Button>Cập nhật</Button>
                        </div>
                      </AccordionContent>
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
        </AccordionContent>
      </DndContext>
      <AddQuestionDialog
        isOpen={isOpenAddQuestion}
        onOpenChange={setIsOpenAddQuestion}
      />
    </>
  )
}

export default DraggableContent
