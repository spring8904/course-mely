export interface OverviewStatistics {
  totalCourse: number
  totalEnrollments: number
  totalRevenue: string
  averageRating: string
}

export interface RevenueStatistics {
  [key: string]: null | string
}
export interface StudentPurchaseStatistics {
  [key: string]: {
    total_purchases: number
    total_students: number
  }
}

export interface CourseRevenueStatistics {
  id: number
  name: string
  price: string
  price_sale: string
  slug: string
  total_revenue: string
  total_student: number
  avg_progress: string
  avg_rating: string
}
