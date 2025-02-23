import { ILesson } from '@/types'

type Props = {
  lesson: ILesson
}

export const DocumentViewer = ({ lesson }: Props) => <h1>{lesson?.title}</h1>
