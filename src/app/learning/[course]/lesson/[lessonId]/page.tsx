import React from 'react'

import ProtectedRoute from '@/components/shared/protected-route'
import LearningLessonView from '@/sections/instructor/view/learning-lesson-view'

type Props = {
  params: { course: string; lessonId: string }
}

const LearningPage = ({ params }: Props) => {
  const { course, lessonId } = params

  return (
    <ProtectedRoute>
      <LearningLessonView courseSlug={course} lessonId={lessonId} />
    </ProtectedRoute>
  )
}

export default LearningPage
