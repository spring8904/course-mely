import { ILesson } from '@/types'

import CodingLesson from '@/sections/learning-path/_components/coding-lesson'
import DocumentLesson from '@/sections/learning-path/_components/document-lesson'
import QuizLesson from '@/sections/learning-path/_components/quiz-lesson'
import VideoLesson from '@/sections/learning-path/_components/video-lesson'

type Props = {
  lesson: ILesson
}

const LessonContent = ({ lesson }: Props) => {
  const lessonComponents = {
    video: <VideoLesson lesson={lesson} />,
    document: <DocumentLesson lesson={lesson} />,
    quiz: <QuizLesson lesson={lesson} />,
    coding: <CodingLesson lesson={lesson} />,
  }

  return lessonComponents[lesson?.type]
}

export default LessonContent
