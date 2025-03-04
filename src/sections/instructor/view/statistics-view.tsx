'use client'

import OverviewStatistics from '../components/statistics/overview-statistics'
import RevenueChart from '../components/statistics/revenue-chart'

const StatisticsView = () => {
  return (
    <>
      <div className="container mx-auto mt-5 space-y-8 px-5 xl:px-8">
        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-xl font-medium leading-none">
            Thống kê khóa học & doanh thu
          </h1>
          <div className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
            Phân tích hiệu quả khóa học của bạn
          </div>
        </div>

        <div className="grid items-stretch gap-5 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-1">
            <OverviewStatistics />
          </div>
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
        </div>
      </div>
    </>
  )
}
export default StatisticsView
