'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const CourseDashboardTable = () => {
  return (
    <Card>
      <CardHeader className="flex items-center gap-4 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Tổng quan khóa học</CardTitle>
          <CardDescription>
            Tổng hợp thông tin khóa học, bao gồm doanh thu và đánh giá
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-4 sm:pt-6"></CardContent>
    </Card>
  )
}
export default CourseDashboardTable
