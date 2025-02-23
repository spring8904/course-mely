import { ILesson } from '@/types'

type Props = {
  lesson: ILesson
}

export const CodingExercise = ({ lesson }: Props) => <h1>{lesson.title}</h1>
