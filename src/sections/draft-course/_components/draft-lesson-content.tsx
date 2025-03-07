import { DraftLesson } from '@/types/DraftCourse'
import DraftDocumentLesson from './draft-document-lesson'
import DraftQuizLesson from './draft-quiz-lesson'
import DraftVideoLesson from './draft-video-lesson'
import DraftCodingLesson from './draft-coding-lesson'

type Props = {
  lesson: DraftLesson
}

const DraftLessonContent = ({ lesson }: Props) => {
  const lessonComponents = {
    video: <DraftVideoLesson lesson={lesson} />,
    document: <DraftDocumentLesson lesson={lesson} />,
    quiz: <DraftQuizLesson lesson={lesson} />,
    coding: <DraftCodingLesson lesson={lesson} />,
  }

  return lessonComponents[lesson?.type]
}

export default DraftLessonContent
