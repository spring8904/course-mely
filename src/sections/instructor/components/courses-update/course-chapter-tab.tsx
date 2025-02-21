'use client'

import { useEffect, useState } from 'react'
import { DndContext, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { CircleCheck, CircleX, SquarePen, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import { IChapter } from '@/types'
import {
  useDeleteChapter,
  useUpdateChapter,
  useUpdateChapterOrder,
} from '@/hooks/instructor/chapter/useChapter'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import DraggableHandle from '@/components/shared/draggable-handle'
import DraggableLesson from '@/sections/instructor/components/courses-update/lesson/draggable-lesson'

import DraggableItem from '../../../../components/shared/draggable-item'
import CreateChapter from './chapter/create-chapter'

type Props = {
  chapters: IChapter[]
  slug: string
  courseStatus?: string
}

const CourseChapterTab = ({
  chapters: chapterList,
  slug,
  courseStatus,
}: Props) => {
  const [chapters, setChapters] = useState<IChapter[]>([])
  const [addNewChapter, setAddNewChapter] = useState(false)
  const [chapterEdit, setChapterEdit] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState<string>('')

  const { mutate: updateChapter } = useUpdateChapter()
  const { mutate: deleteChapter } = useDeleteChapter()
  const { mutate: updateChapterOrder, isPending: isUpdateOrder } =
    useUpdateChapterOrder()

  const handleUpdateChapter = (id: number) => {
    if (!editTitle.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng nhập tên chương',
      })

      return
    }

    if (editTitle !== chapters.find((chapter) => chapter.id === id)?.title) {
      updateChapter(
        { slug, id, data: { title: editTitle } },
        {
          onSuccess: () => {
            setChapterEdit(null)
            setEditTitle('')
          },
        }
      )
    } else {
      setChapterEdit(null)
      setEditTitle('')
      toast.info('Dữ liệu không thay đổi')
    }
  }

  const handleDeleteChapter = (id: number) => {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc muốn xóa chương này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteChapter({ slug, id })
      }
    })
  }

  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    if (over && active.id !== over?.id) {
      const oldIndex = chapters.findIndex(({ id }) => id === active.id)
      const newIndex = chapters.findIndex(({ id }) => id === over.id)

      const newChapters = arrayMove(chapters, oldIndex, newIndex)
      setChapters(newChapters)

      const payload = newChapters
        .filter((chapter) => chapter.id !== undefined)
        .map((chapter, index) => ({
          id: chapter.id as number,
          order: index + 1,
        }))

      updateChapterOrder({ slug, chapters: payload })
    }
  }

  useEffect(() => {
    setChapters(chapterList || [])
  }, [chapterList])

  return (
    <div className="rounded-md">
      <div>
        <h1 className="text-xl font-bold">Chương trình giảng dạy</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Bắt đầu xây dựng khoá học của bạn bằng cách tạo các phần bài giảng và
          các hoạt động thực hành.
        </p>
      </div>
      <div className="mt-4">
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext
            items={chapters.map((chapter) => chapter.id as UniqueIdentifier)}
          >
            <Accordion type="multiple" className="space-y-6">
              {chapters?.map((chapter, chapterIndex) => (
                <DraggableItem
                  key={chapter.id}
                  id={chapter.id}
                  disabled={isUpdateOrder}
                >
                  <AccordionItem value={`${chapter.id}`}>
                    <AccordionTrigger className="rounded-lg">
                      <div className="flex w-full items-center gap-4">
                        <div className="flex w-full items-center gap-2">
                          {chapterEdit === chapter.id ? (
                            <>
                              <div
                                className="w-full"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Input
                                  placeholder="Nhập tên chương"
                                  value={editTitle}
                                  onChange={(e) => setEditTitle(e.target.value)}
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <span
                                  className="flex size-8 items-center justify-center rounded-md border border-[#131316]"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleUpdateChapter(chapter.id as number)
                                  }}
                                >
                                  <CircleCheck size={14} />
                                </span>
                                <span
                                  className="flex size-8 items-center justify-center rounded-md border border-[#131316]"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setChapterEdit(null)
                                  }}
                                >
                                  <CircleX size={14} />
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                Chương {chapterIndex + 1}: {chapter.title}
                              </div>
                              <div className="flex items-center gap-2">
                                <span
                                  className="flex size-8 items-center justify-center rounded-md border border-[#131316]"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setChapterEdit(chapter.id as number)
                                    setEditTitle(chapter.title || '')
                                  }}
                                >
                                  <SquarePen size={14} />
                                </span>
                                {(courseStatus === 'draft' ||
                                  courseStatus === 'rejected') && (
                                  <span
                                    className="flex size-8 items-center justify-center rounded-md border border-[#131316]"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDeleteChapter(chapter.id as number)
                                    }}
                                  >
                                    <Trash2 size={14} />
                                  </span>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                        <div className="ml-auto mr-4">
                          <DraggableHandle />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="mt-3 rounded-lg p-4">
                      <DraggableLesson
                        courseStatus={courseStatus}
                        chapter={chapter}
                        slug={slug}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </DraggableItem>
              ))}
            </Accordion>
          </SortableContext>
        </DndContext>

        {addNewChapter ? (
          <CreateChapter onHide={() => setAddNewChapter(false)} />
        ) : (
          <>
            <Button
              disabled={courseStatus !== 'draft' && courseStatus !== 'rejected'}
              onClick={() => setAddNewChapter(true)}
              className="mt-4"
            >
              <SquarePen size={18} />
              Thêm chương mới
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
export default CourseChapterTab
