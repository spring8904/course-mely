export enum AnswerType {
  MultipleChoice = 'multiple_choice',
  OneChoice = 'single_choice',
}

export interface IQuiz {
  id?: number
  quiz_id?: number
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

export interface GetQuizResponse {
  id: number
  title: string
  content: string
  questions: Question[]
}

export interface Question {
  id: number
  quiz_id: number
  question: string
  type: string
  image: null
  description: null | string
  answers: Answer[]
}

export interface Answer {
  answer: string
  is_correct: number
}
