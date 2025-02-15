import { IUser } from '@/types/User'

export enum CourseStatus {
  Draft = 'draft',
  Pending = 'pending',
  Approved = 'approved',
  Reject = 'reject',
}

export interface ICourse {
  id?: number
  user_id?: number
  category_id?: number
  code?: string
  name: string
  slug?: string
  thumbnail: string
  intro?: string | null
  price?: number | null
  price_sale?: number | null
  description?: string | null
  content?: string | null
  level?: string | null
  duration?: number | null
  total_student?: number
  requirements?: string[]
  benefits?: string[]
  qa?: { question: string; answer: string }[]
  is_popular?: 0 | 1
  status: CourseStatus
  chapters?: IChapter[]
  lessons_count?: number
  chapters_count?: number
  accepted?: Date | null
  user: IUser
  deleted_at?: Date | null
  created_at?: Date | null
  updated_at?: Date | null
}
export type ICourses = ICourse[]

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
