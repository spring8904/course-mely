import React, { useState } from 'react'

import { LessonType } from '@/types'

import AddCodingDialog from '@/sections/instructor/components/courses-update/lesson/coding/add-coding-dialog'
import LessonDocument from '@/sections/instructor/components/courses-update/lesson/lesson-document'
import LessonQuiz from '@/sections/instructor/components/courses-update/lesson/lesson-quiz'
import LessonVideo from '@/sections/instructor/components/courses-update/lesson/lesson-video'

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
