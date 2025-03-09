import { CourseStatus } from '@/types'
import { create } from 'zustand'

interface CourseStatusStore {
  courseStatus: CourseStatus
  setCourseStatus: (status: CourseStatus) => void
  isDraftOrRejected: boolean
}

export const useCourseStatusStore = create<CourseStatusStore>((set) => ({
  courseStatus: CourseStatus.Draft,
  setCourseStatus: (status) =>
    set({
      courseStatus: status,
      isDraftOrRejected:
        status === CourseStatus.Draft || status === CourseStatus.Reject,
    }),
  isDraftOrRejected: true,
}))
