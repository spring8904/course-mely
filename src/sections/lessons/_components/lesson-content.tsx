import { ILesson } from '@/types'

import { CodingExercise } from '@/sections/lessons/_components/coding-exercise/coding-exercise'
import { DocumentViewer } from '@/sections/lessons/_components/document-viewer/document-viewer'
import { Quiz } from '@/sections/lessons/_components/quiz/quiz'
import { VideoPlayer } from '@/sections/lessons/_components/video-player/video-player'

type Props = {
  lesson: ILesson
}

export const LessonContent = ({ lesson }: Props) => {
  const lessonComponents = {
    video: <VideoPlayer lesson={lesson} />,
    document: <DocumentViewer lesson={lesson} />,
    quiz: <Quiz lesson={lesson} />,
    coding: <CodingExercise lesson={lesson} />,
  }

  return lessonComponents[lesson?.type]
}
