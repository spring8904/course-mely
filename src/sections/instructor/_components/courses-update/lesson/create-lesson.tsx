import React from 'react'

import { LessonType } from '@/types'

import LessonDocument from '@/sections/instructor/_components/courses-update/lesson/_components/lesson-document'
import LessonQuiz from '@/sections/instructor/_components/courses-update/lesson/_components/lesson-quiz'
import LessonVideo from '@/sections/instructor/_components/courses-update/lesson/_components/lesson-video'

type Props = {
  chapterId: string
  type: LessonType
  onHide: () => void
  onSuccess: () => void
}

const CreateLesson = ({ chapterId, onHide, type }: Props) => {
  return (
    <div className="mt-4 flex h-full flex-col justify-between rounded-lg border p-4">
      <div>
        {(() => {
          switch (type) {
            case 'video':
              return <LessonVideo onHide={onHide} chapterId={chapterId} />
            case 'document':
              return <LessonDocument onHide={onHide} chapterId={chapterId} />
            case 'quiz':
              return <LessonQuiz onHide={onHide} chapterId={chapterId} />
            case 'coding':
              return 'Thêm bài tập'
            default:
              return 'Thêm bài giảng'
          }
        })()}
      </div>
    </div>
  )
}
export default CreateLesson
