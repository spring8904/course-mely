import { IUser } from '@/types/User'

import { BadgeProps } from '@/components/ui/badge'

import { ICategory } from './Category'

export enum CourseStatus {
  Draft = 'draft',
  Pending = 'pending',
  Approved = 'approved',
  Reject = 'rejected',
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

export interface Lessonable {
  id: number
  title: string
  type?: LessonableType
  url?: string
  asset_id?: string
  mux_playback_id?: string
  duration?: number
  created_at: Date
  updated_at: Date
  content?: string
  file_path?: string
  file_type?: string
  language?: string
  hints?: string[]
  instruct?: string
  sample_code?: string
  result_code?: string
  solution_code?: string
}
export enum LessonableType {
  Upload = 'upload',
}

export enum LessonType {
  Coding = 'coding',
  Document = 'document',
  Quiz = 'quiz',
  Video = 'video',
}

export interface ILesson {
  id?: number
  slug?: string
  chapter_id?: number
  title: string
  duration?: number | null
  content: string
  playbackId?: string | null
  is_free_preview?: 0 | 1
  order?: number | null
  type: LessonType
  lessonable_id?: number
  lessonable?: Lessonable
  created_at: string
  updated_at: string
}

export interface ILessonLearningPath {
  id: number
  title: string
  type: LessonType
  is_completed: boolean
  is_unlocked: boolean
  order: number
  lessonable: Lessonable
}

export interface ILessonProcess {
  id: number
  user_id: number
  lesson_id: number
  is_completed: number
  last_time_video: number
  created_at: Date
  updated_at: Date
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
