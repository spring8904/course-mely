import React from 'react'

import LearningPathView from '@/sections/learning-path/view/learning-path-view'

type Props = {
  params: { course: string; lessonId: string }
}

const LearningPage = ({ params }: Props) => {
  const { course, lessonId } = params

  return <LearningPathView courseSlug={course} lessonId={lessonId} />
}

export default LearningPage
