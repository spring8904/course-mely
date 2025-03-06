export interface DraftCourse {
  title: string
  status: string
  chapters: DraftChapter[]
}

export interface DraftChapter {
  title: string
  total_duration: number
  total_lessons: number
  lessons: DraftLesson[]
}

export interface DraftLesson {
  title: string
  updated_at: Date
  type: string
  sample_code: string
  hints: string[]
  instruct: null
  language: string
}
