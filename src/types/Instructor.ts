export interface IInstructorProfile {
  id?: number
  userId?: number
  phone?: string
  address?: string | null
  experience?: string | null
  bio?: string[]
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IInstructorEducation {
  id?: number
  instructorProfileId?: number
  institutionName?: string | null
  degree?: string | null
  major?: string | null
  startDate?: Date | null
  endDate?: Date | null
  certificates?: string[]
  qaSystems?: string[]
  createdAt?: Date | null
  updatedAt?: Date | null
}
