export enum AnswerType {
  MultipleChoice = 'multiple-choice',
  OneChoice = 'one_choice',
}

export interface IQuiz {
  id?: number
  lessonId?: number
  question: string
  image?: string | null
  answerType: AnswerType
  description?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IQuizAnswer {
  id?: number
  quizId?: number
  answer: string
  isCorrect?: 0 | 1
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IUserQuizSubmission {
  id?: number
  userId?: number
  quizId?: number
  userAnswers: string[]
  createdAt?: Date | null
  updatedAt?: Date | null
}
