import React, { useState } from 'react'

import { LessonType } from '@/types'

import AddCodingDialog from '@/sections/instructor/_components/courses-update/lesson/_components/coding/add-coding-dialog'
import LessonDocument from '@/sections/instructor/_components/courses-update/lesson/_components/lesson-document'
import LessonQuiz from '@/sections/instructor/_components/courses-update/lesson/_components/lesson-quiz'
import LessonVideo from '@/sections/instructor/_components/courses-update/lesson/_components/lesson-video'

type Props = {
  chapterId?: string
  type: LessonType
  onHide: () => void
  onSuccess: () => void
  courseStatus?: string
}

const CreateLesson = ({ chapterId, onHide, type, courseStatus }: Props) => {
  const [isCodingDialogOpen, setIsCodingDialogOpen] = useState(true)

  return (
    <>
      {type === 'coding' ? (
        <AddCodingDialog
          chapterId={chapterId as string}
          open={isCodingDialogOpen}
          onOpenChange={(open) => {
            setIsCodingDialogOpen(open)
            if (!open) onHide()
          }}
        />
      ) : (
        <div className="mt-4 flex h-full flex-col justify-between rounded-lg border p-4">
          {(() => {
            switch (type) {
              case 'video':
                return (
                  <LessonVideo
                    onHide={onHide}
                    chapterId={chapterId}
                    courseStatus={courseStatus}
                  />
                )
              case 'document':
                return <LessonDocument onHide={onHide} chapterId={chapterId} />
              case 'quiz':
                return (
                  <LessonQuiz
                    onHide={onHide}
                    chapterId={chapterId}
                    courseStatus={courseStatus}
                  />
                )
              default:
                return 'Thêm bài giảng'
            }
          })()}
        </div>
      )}
    </>
  )
}

export default CreateLesson
