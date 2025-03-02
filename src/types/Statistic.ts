export interface Revenue {
  total_revenue: TotalRevenue[]
  user_buy_course: UserBuyCourse[]
  topCourse: TopCourse[]
}

export interface TopCourse {
  course_id: number
  month: number
  total_bought_course: number
  course: Course
}

export interface Course {
  id: number
  name: string
  slug: string
  instructor: null
}

export interface TotalRevenue {
  month: number
  total_revenue: string
}

export interface UserBuyCourse {
  user_id: number
  course_id: number
  user: User
  course: Course
}

export interface User {
  id: number
  name: string
  avatar: string
}
