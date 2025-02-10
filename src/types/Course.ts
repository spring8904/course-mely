export enum CourseStatus {
  Draft = 'draft',
  Pending = 'pending',
  Approved = 'approved',
  Reject = 'reject',
}

export interface ICourse {
  id?: number
  userId?: number
  categoryId?: number
  code: string
  name: string
  slug?: string
  thumbnail?: string | null
  price?: number | null
  priceSale?: number | null
  description?: string | null
  content?: string | null
  level?: string | null
  duration?: number | null
  totalStudent?: number
  requirements?: string[]
  benefits?: string[]
  qa?: { question: string; answer: string }[]
  isPopular?: 0 | 1
  status: CourseStatus
  accepted?: Date | null
  deletedAt?: Date | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IChapter {
  id?: number
  courseId?: number
  title: string
  order?: number | null
  lessons?: ILesson[]
  createdAt?: Date | null
  updatedAt?: Date | null
}

export type LessonType = 'video' | 'document' | 'quiz' | 'coding'

export interface ILesson {
  id?: number
  chapterId?: number
  title: string
  duration?: number | null
  content: string
  playbackId?: string | null
  isFreePreview?: 0 | 1
  order?: number | null
  type: LessonType
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface ICourseUser {
  id?: number
  userId?: number
  courseId?: number
  progressPercent: number
  enrolledAt?: Date | null
  completedAt?: Date | null
  createdAt?: Date | null
  updatedAt?: Date | null
}
