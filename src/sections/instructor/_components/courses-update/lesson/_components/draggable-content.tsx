import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { DndContext, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import MuxUploader from '@mux/mux-uploader-react'
import { Label } from '@radix-ui/react-label'
import {
  CircleHelp,
  CirclePlay,
  CirclePlus,
  CircleX,
  FileCode2,
  ScrollText,
  SquarePen,
  Trash2,
  Video,
} from 'lucide-react'

import { IChapter, ILesson, LessonType } from '@/types'
import { cn } from '@/lib/utils'
import { useUpdateOrderLesson } from '@/hooks/instructor/lesson/useLesson'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import DraggableHandle from '@/sections/instructor/_components/courses-update/lesson/_components/draggable-handle'
import DraggableItem from '@/sections/instructor/_components/courses-update/lesson/_components/draggable-item'
import CreateLesson from '@/sections/instructor/_components/courses-update/lesson/create-lesson'

export interface DraggableContentProps {
  chapter: IChapter
  slug: string
}

const DraggableContent = ({ chapter, slug }: DraggableContentProps) => {
  const [addNewLesson, setAddNewLesson] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<LessonType>()
  const [lessonList, setLessonList] = useState<ILesson[]>([])

  const { mutate } = useUpdateOrderLesson()

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

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <AccordionContent className="mt-3 rounded-lg p-4">
        <SortableContext
          items={lessonList.map((lesson) => lesson.id as UniqueIdentifier)}
        >
          {lessonList.map((lesson, lessonIndex) => (
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
                            Bài giảng {lessonIndex + 1}: {lesson.title}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <SquarePen size={18} />
                          <Trash2 size={18} />
                        </div>
                        <div className="ml-auto mr-4">
                          <DraggableHandle />
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 space-y-3 rounded-lg p-4">
                    <div className="space-y-2">
                      <Label>Loại bài giảng</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại bài giảng" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="document">Tài liệu</SelectItem>
                          <SelectItem value="quiz">Câu hỏi</SelectItem>
                          <SelectItem value="coding">Bài tập Code</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Bài giảng</Label>
                      <MuxUploader />
                    </div>
                    <div className="space-y-2">
                      <Label>Nội dung </Label>
                      <Textarea
                        placeholder="Nội dung bài giảng"
                        defaultValue={lesson.content}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Xem trước</Button>
                      <Button>Cập nhật</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </DraggableItem>
          ))}
        </SortableContext>
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <Link
              href={`/course/${slug}/coding-exercise`}
              className={cn(buttonVariants({ variant: 'outline' }))}
            >
              Coding
            </Link>

            {addNewLesson ? (
              <Button
                onClick={() => {
                  setAddNewLesson(false)
                  setSelectedLesson(undefined)
                }}
                variant="secondary"
              >
                <CircleX />
                Đóng
              </Button>
            ) : (
              <Button onClick={() => setAddNewLesson(true)}>
                <CirclePlus />
                Thêm bài học
              </Button>
            )}
          </div>

          {addNewLesson &&
            (selectedLesson ? (
              <CreateLesson
                onHide={() => setSelectedLesson(undefined)}
                type={selectedLesson!}
                chapterId={chapter.id!}
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
  )
}

export default DraggableContent
