import StatisticsView from '@/sections/instructor/view/statistics-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thống kê khóa học & doanh thu',
}

const page = () => {
  return <StatisticsView />
}

export default page
