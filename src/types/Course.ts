import { IUser } from '@/types/User'

import { BadgeProps } from '@/components/ui/badge'

import { ICategory } from './Category'

export enum CourseStatus {
  Draft = 'draft',
  Pending = 'pending',
  Approved = 'approved',
  Reject = 'reject',
}

export const CourseStatusMap: Record<
  CourseStatus,
  { label: string; badge: BadgeProps['variant'] }
> = {
  [CourseStatus.Draft]: { label: 'Bản nháp', badge: 'secondary' },
  [CourseStatus.Pending]: { label: 'Chờ duyệt', badge: 'info' },
  [CourseStatus.Approved]: { label: 'Đã duyệt', badge: 'success' },
  [CourseStatus.Reject]: { label: 'Từ chối', badge: 'error' },
}

export interface ICourse {
  id?: number
  user_id?: number
  category_id?: number
  category?: ICategory
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
  requirements?: string | string[]
  benefits?: string | string[]
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
  lessons_count?: number
  createdAt?: Date | null
  updatedAt?: Date | null
}

export type LessonType = 'video' | 'document' | 'quiz' | 'coding'

type LessonableType = Record<string, unknown>

export interface ILesson {
  id?: number
  slug?: string
  chapterId?: number
  title: string
  duration?: number | null
  content: string
  playbackId?: string | null
  isFreePreview?: 0 | 1
  order?: number | null
  type: LessonType
  lessonable_id?: number
  lessonable?: LessonableType
  created_at: string
  updated_at: string
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
