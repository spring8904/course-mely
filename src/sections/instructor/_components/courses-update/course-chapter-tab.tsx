import React, { useState } from 'react'
import { SquarePen } from 'lucide-react'

import { IChapter } from '@/types'

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
import DraggableContent from '@/sections/instructor/_components/courses-update/lesson/_components/draggable-content'

import CreateChapter from './chapter/create-chapter'

type Props = {
  chapters: IChapter[]
  slug: string
}

const CourseChapterTab = ({ chapters, slug }: Props) => {
  const [addNewChapter, setAddNewChapter] = useState(false)

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
            <Accordion type="single" collapsible key={chapterIndex}>
              <AccordionItem value={`item-${chapter.id}`}>
                <AccordionTrigger className="rounded-lg">
                  Chương {chapterIndex + 1}: {chapter.title}
                </AccordionTrigger>
                <DraggableContent chapter={chapter} slug={slug} />
              </AccordionItem>
            </Accordion>
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
