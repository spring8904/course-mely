export enum AnswerType {
  MultipleChoice = 'multiple-choice',
  OneChoice = 'single_choice',
}

export interface IQuiz {
  id?: number
  lessonId?: number
  question: string
  image?: string | null
  answer_type: AnswerType
  answers: IQuizAnswer[]
  description?: string | null
  created_at: string
  updated_at: string
}

export interface IQuizAnswer {
  id?: number
  question_id?: number
  answer: string
  is_correct?: 0 | 1
  created_at: string
  updated_at: string
}

export interface IUserQuizSubmission {
  id?: number
  userId?: number
  quizId?: number
  userAnswers: string[]
  createdAt?: Date | null
  updatedAt?: Date | null
}
