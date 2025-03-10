import CourseDashboardTable from '../components/statistics/course-dashboard-table'
import OverviewStatistics from '../components/statistics/overview-statistics'
import RevenueChart from '../components/statistics/revenue-chart'
import StudentPurchaseChart from '../components/statistics/student-purchase-chart'

const StatisticsView = () => {
  return (
    <>
      <div className="container mx-auto mt-5 space-y-8 px-5 pb-20 xl:px-8">
        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-xl font-medium leading-none">
            Thống kê khóa học & doanh thu
          </h1>
          <div className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
            Phân tích hiệu quả khóa học của bạn
          </div>
        </div>

        <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3">
          <div className="xl:col-span-1">
            <OverviewStatistics />
          </div>
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>
        </div>

        <StudentPurchaseChart />

        <CourseDashboardTable />
      </div>
    </>
  )
}
export default StatisticsView
