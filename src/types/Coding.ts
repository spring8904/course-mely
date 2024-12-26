export interface ICodingExercise {
  id?: number
  title: string
  language: string
  hints?: string
  sampleCode?: string | null
  resultCode: string
  output: string
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IUserCodingSubmission {
  id?: number
  userId?: number
  codingExerciseId?: number
  code: string
  result?: 0 | 1
  createdAt?: Date | null
  updatedAt?: Date | null
}
