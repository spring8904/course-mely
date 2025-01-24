import { ReactNode } from 'react'
import { IAuthData } from './Auth'
import { RegisterOptions } from 'react-hook-form'

export interface ISetting {
  id?: number
  key: string
  value: string
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface INote {
  id?: number
  userId?: number
  lessonId?: number
  duration: number
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IComment {
  id?: number
  userId?: number
  parentId?: number | null
  content?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IRating {
  id?: number
  userId?: number
  courseId?: number
  content?: string
  rate: number
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IUserLessonProgress {
  id?: number
  userId?: number
  lessonId?: number
  isCompleted?: 0 | 1
  lastPlayedTime?: number
  lastTimeVideo?: number
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IFormControl {
  id: string
  type: string
  name: keyof IAuthData
  label: string
  rules?: RegisterOptions<IAuthData, keyof IAuthData>
}

export interface ISidebarData {
  name: string
  icon?: ReactNode
}
