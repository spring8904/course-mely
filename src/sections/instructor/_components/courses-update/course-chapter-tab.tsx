import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheck, CircleX, SquarePen, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

import { IChapter } from '@/types'
import { UpdateChapterPayload } from '@/validations/chapter'
import {
  useDeleteChapter,
  useUpdateChapter,
} from '@/hooks/instructor/chapter/useChapter'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import DraggableHandle from '@/sections/instructor/_components/courses-update/_components/draggable-handle'
import DraggableContent from '@/sections/instructor/_components/courses-update/lesson/_components/draggable-content'

import CreateChapter from './chapter/create-chapter'

type Props = {
  chapters: IChapter[]
  slug: string
}

const CourseChapterTab = ({ chapters, slug }: Props) => {
  const [addNewChapter, setAddNewChapter] = useState(false)
  const [chapterEdit, setChapterEdit] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState<string>('')

  const { mutate: updateChapter } = useUpdateChapter()
  const { mutate: deleteChapter } = useDeleteChapter()

  const handleUpdateChapter = (id: number) => {
    if (!editTitle.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng nhập tên chương',
      })

      return
    }

    updateChapter(
      { slug, id, data: { title: editTitle } },
      {
        onSuccess: () => {
          setChapterEdit(null)
          setEditTitle('')
        },
      }
    )
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
  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle className="text-xl">Chương trình giảng dạy</CardTitle>
        <CardDescription>
          Bắt đầu xây dựng khoá học của bạn bằng cách tạo các phần bài giảng và
          các hoạt động thực hành.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {chapters?.map((chapter, chapterIndex) => (
            <>
              <Accordion
                type="single"
                collapsible={!chapterEdit}
                key={chapterIndex}
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

                              <span
                                className="flex size-8 items-center justify-center rounded-md border border-[#131316]"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteChapter(chapter.id as number)
                                }}
                              >
                                <Trash2 size={14} />
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="ml-auto mr-4">
                        <DraggableHandle />
                      </div>
                    </div>
                  </AccordionTrigger>
                  <DraggableContent chapter={chapter} slug={slug} />
                </AccordionItem>
              </Accordion>
            </>
          ))}
        </div>
        {addNewChapter ? (
          <CreateChapter onHide={() => setAddNewChapter(false)} />
        ) : (
          <>
            <Button onClick={() => setAddNewChapter(true)} className="mt-4">
              <SquarePen size={18} />
              Thêm chương mới
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
export default CourseChapterTab
