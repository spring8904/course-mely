'use client'

import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import api from '@/configs/api'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

const statisticFilter = [
  {
    label: 'Hôm nay',
    key: 'today',
  },
  {
    label: 'Hôm qua',
    key: 'yesterday',
  },
  {
    label: 'Tuần này',
    key: 'this_week',
  },
  {
    label: 'Tháng này',
    key: 'this_month',
  },
  {
    label: 'Năm nay',
    key: 'this_year',
  },
]
const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const featuredCourses = [
  {
    id: 1,
    name: 'Course 1',
    category: 'Design',
    students: 120,
    revenue: '$4,000',
  },
  {
    id: 2,
    name: 'Course 2',
    category: 'Development',
    students: 95,
    revenue: '$3,800',
  },
  {
    id: 3,
    name: 'Course 3',
    category: 'Marketing',
    students: 80,
    revenue: '$2,100',
  },
]

const featuredStudents = [
  {
    id: 1,
    name: 'Student A',
    email: 'studenta@example.com',
    completedCourses: 10,
  },
  {
    id: 2,
    name: 'Student B',
    email: 'studentb@example.com',
    completedCourses: 8,
  },
  {
    id: 3,
    name: 'Student C',
    email: 'studentc@example.com',
    completedCourses: 5,
  },
]

export function StatisticView() {
  const [selectFilter, setSelectFilter] = useState('today')

  const [stats, setStats] = useState({
    totalRevenue: 0,
    numberOfCourses: 0,
    numberOfStudents: 0,
    chartData: [],
  })

  const fetchStatistics = async (selectFilter: any) => {
    try {
      const response = await api.get('instructor/statistics/revenue', {
        params: { selectFilter },
      })
      if (response.data) {
        setStats(response.data)
      }
    } catch (err) {
      console.error('Failed to fetch statistics:', err)
    } finally {
    }
  }

  useEffect(() => {
    fetchStatistics(selectFilter)
  }, [selectFilter])

  const handleTimeRangeChange = (newValue: string) => {
    setSelectFilter(newValue)
  }

  console.log(stats)

  return (
    <div className="px-5 py-6">
      <div className="mt-2 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Thống kê doanh thu</h1>
        </div>
      </div>

      <div className="grid gap-4 py-6 md:grid-cols-3">
        <Card className="ounded-lg bg-white">
          <CardContent className="p-4">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Doanh thu
            </CardTitle>
            <CardDescription className="mt-2 text-2xl font-bold text-green-600"></CardDescription>
            <div className="mt-2 text-sm text-gray-500">Dựa trên</div>
          </CardContent>
        </Card>

        <Card className="rounded-lg bg-white">
          <CardContent className="p-4">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Khoá học
            </CardTitle>
            <CardDescription className="mt-2 text-2xl font-bold text-blue-600"></CardDescription>
            <div className="mt-2 text-sm text-gray-500">Trong thời gian</div>
          </CardContent>
        </Card>

        <Card className="rounded-lg bg-white">
          <CardContent className="p-4">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Học viên
            </CardTitle>
            <CardDescription className="mt-2 text-2xl font-bold text-purple-600"></CardDescription>
            <div className="mt-2 text-sm text-gray-500">Đã tham gia</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mx-auto mt-6 rounded-lg bg-gray-50 p-2">
        <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Biểu dồ </CardTitle>
            <CardDescription>Thống kê doanh thu & học viên</CardDescription>
          </div>
          <Select value={selectFilter} onValueChange={handleTimeRangeChange}>
            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Chọn khoảng thời gian" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectGroup>
                {statisticFilter?.map((item: any) => (
                  <SelectItem value={item.key} key={item.key}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="aspect-auto h-[250px] w-full"
            config={chartConfig}
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <Bar
                barSize={50}
                dataKey="total_revenue"
                fill="var(--color-desktop)"
                name="Revenue"
                radius={8}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="space-y-8 py-6">
        <div>
          <h1 className="mb-4 text-xl font-bold">Khoá học nổi bật</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên khoá học</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Học viên</TableHead>
                <TableHead>Doanh thu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {featuredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.id}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>{course.students}</TableCell>
                  <TableCell>{course.revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h1 className="mb-4 text-xl font-bold">Học viên nổi bật</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên học viên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Khoá học đã hoàn thành</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {featuredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.completedCourses}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
