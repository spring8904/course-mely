import { ILesson } from '@/types'

import CodingLesson from '@/sections/learning-path/_components/coding-lesson'
import DocumentLesson from '@/sections/learning-path/_components/document-lesson'
import QuizLesson from '@/sections/learning-path/_components/quiz-lesson'
import VideoLesson from '@/sections/learning-path/_components/video-lesson'

type Props = {
  lesson: ILesson
  isCompleted: boolean
  lastTimeVideo?: number
}

const LessonContent = ({ lesson, isCompleted, lastTimeVideo }: Props) => {
  const lessonComponents = {
    video: (
      <VideoLesson
        lesson={lesson}
        isCompleted={isCompleted}
        lastTimeVideo={lastTimeVideo}
      />
    ),
    document: <DocumentLesson lesson={lesson} isCompleted={isCompleted} />,
    quiz: <QuizLesson lesson={lesson} isCompleted={isCompleted} />,
    coding: <CodingLesson lesson={lesson} isCompleted={isCompleted} />,
  }

  return lessonComponents[lesson?.type]
}

export default LessonContent
