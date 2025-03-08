'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { BarChart, Bar, XAxis, CartesianGrid } from 'recharts'
import { useGetLearnerProcess } from '@/hooks/learner/useLearner'
import { Book, CheckCircle, Clock, LineChart, Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/common'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

interface CourseOverview {
  total_courses: number
  completed_courses: number
  ongoing_courses: number
  average_progress: number
}

interface RecentLesson {
  name: string
  completed_at: string | undefined
}

interface Course {
  course_id: string
  name: string
  progress: number
  status: 'completed' | 'ongoing'
  enrolled_at: string
  recent_lesson?: RecentLesson
}

const chartConfig = {
  hours: {
    label: 'Số giờ',
    color: '#EA580C',
  },
} satisfies ChartConfig

const TIME_RANGES = [
  { label: 'Hôm nay', value: 'today' },
  { label: '7 ngày qua', value: '7days' },
  { label: '2 tuần gần đây', value: '2weeks' },
  { label: '1 tháng gần đây', value: '1month' },
  { label: '3 tháng gần đây', value: '3months' },
  { label: '6 tháng gần đây', value: '6months' },
]

const LearnerInformationView = ({ code }: { code: string }) => {
  const [courseList, setCourseList] = useState<Course[]>([])
  const [courseOverView, setCourseOverView] = useState<CourseOverview | null>(
    null
  )
  const [timeRange, setTimeRange] = useState<string>('7days')
  const params = useMemo(() => {
    const endDate = new Date()
    const startDate = new Date()

    switch (timeRange) {
      case 'today':
        startDate.setHours(0, 0, 0, 0)
        break
      case '7days':
        startDate.setDate(startDate.getDate() - 7)
        break
      case '2weeks':
        startDate.setDate(startDate.getDate() - 14)
        break
      case '1month':
        startDate.setMonth(startDate.getMonth() - 1)
        break
      case '3months':
        startDate.setMonth(startDate.getMonth() - 3)
        break
      case '6months':
        startDate.setMonth(startDate.getMonth() - 6)
        break
      default:
        startDate.setDate(startDate.getDate() - 7)
    }

    return {
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    }
  }, [timeRange])

  const { data: learnerProcess, isLoading } = useGetLearnerProcess(code, params)

  useEffect(() => {
    if (learnerProcess?.data) {
      setCourseOverView(learnerProcess.data.overview)
      setCourseList(learnerProcess.data.courses)
    }
  }, [learnerProcess])

  return (
    <div className="bg-slate-50 px-5 py-6">
      <div className="">
        <div className="mt-2 space-y-6">
          <h1 className="text-xl font-bold">
            Tiến độ học tập của: {learnerProcess?.data.user.name}
          </h1>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="rounded-full bg-blue-100 p-3">
                    <Book className="size-6 text-blue-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-blue-600">
                      {courseOverView?.total_courses || 0}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-gray-600">
                      Tổng số khóa học
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Completed Courses */}
            <Card className="transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle className="size-6 text-green-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-green-600">
                      {courseOverView?.completed_courses || 0}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-gray-600">
                      Khóa học đã hoàn thành
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ongoing Courses */}
            <Card className="transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="rounded-full bg-orange-100 p-3">
                    <Clock className="size-6 text-orange-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-orange-600">
                      {courseOverView?.ongoing_courses || 0}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-gray-600">
                      Khóa học đang học
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Average Progress */}
            <Card className="transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="rounded-full bg-purple-100 p-3">
                    <LineChart className="size-6 text-purple-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-purple-600">
                      {courseOverView?.average_progress || 0}%
                    </h3>
                    <p className="mt-2 text-sm font-medium text-gray-600">
                      Tiến độ trung bình
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="py-6">
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="mb-4 grid size-full grid-cols-2 justify-between rounded-lg border p-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="lessons">Bài học</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Danh sách khóa học</CardTitle>
                  <CardDescription>
                    Các khóa học đã đăng ký và tiến độ học tập
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseList?.map((course) => (
                      <div key={course.course_id}>
                        <div className="mb-1 flex justify-between">
                          <span className="text-sm font-medium">
                            {course.name}
                          </span>
                          <span className="text-sm font-medium">
                            {course.progress}%
                          </span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <div className="mt-2 flex justify-between">
                          <Badge
                            variant={
                              course.status === 'completed'
                                ? 'success'
                                : 'default'
                            }
                            className="text-xs"
                          >
                            {course.status === 'completed'
                              ? 'Đã hoàn thành'
                              : 'Đang học'}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Ngày đăng ký: {formatDate(course.enrolled_at)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>Thời gian học</CardTitle>
                    <CardDescription>Thời gian học tập gần đây</CardDescription>
                  </div>
                  <div>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger
                        className="w-fit rounded-lg"
                        aria-label="Chọn khoảng thời gian"
                        hideArrow
                      >
                        <SelectValue placeholder="Chọn khoảng thời gian" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl" align="end">
                        {TIME_RANGES.map((range) => (
                          <SelectItem
                            key={range.value}
                            value={range.value}
                            className="rounded-lg"
                          >
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      data={learnerProcess?.data?.study_time?.weeklyData || []}
                      accessibilityLayer
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="week"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Bar
                        dataKey="hours"
                        fill="#EA580C"
                        radius={8}
                        name="Số giờ"
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                  <div className="leading-none text-muted-foreground">
                    Thống kê thời gian học tập theo tuần
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="lessons">
            <Card>
              <CardHeader>
                <CardTitle>Chứng chỉ đã đạt được</CardTitle>
                <CardDescription>
                  Danh sách chứng chỉ sau khi hoàn thành khóa học
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center space-y-4 py-10">
                    <Loader2 className="size-10 animate-spin border-primary" />
                    <p className="text-sm text-muted-foreground">
                      Đang tải dữ liệu...
                    </p>
                  </div>
                ) : learnerProcess?.data?.certificate &&
                  learnerProcess.data.certificate.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tên khóa học</TableHead>
                          <TableHead>Mã chứng chỉ</TableHead>
                          <TableHead>Ngày cấp</TableHead>
                          <TableHead>Chứng chỉ</TableHead>
                          <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {learnerProcess.data.certificate.map((cert: any) => (
                          <TableRow key={cert.id}>
                            <TableCell className="font-medium">
                              {cert.course_name}
                            </TableCell>
                            <TableCell>{cert.code}</TableCell>
                            <TableCell>{formatDate(cert.issued_at)}</TableCell>
                            <TableCell className="cursor-pointer">
                              <Dialog>
                                <DialogTrigger>
                                  <div className="relative h-20 w-28 cursor-pointer hover:opacity-80">
                                    <div className="absolute inset-0 animate-pulse rounded bg-muted" />
                                    <Image
                                      src={cert.file_path.replace(
                                        '.pdf',
                                        '.jpg'
                                      )}
                                      alt={cert.course_name}
                                      fill
                                      className="rounded object-contain"
                                      onLoad={(e) => {
                                        const target = e.target as HTMLElement
                                        target.previousElementSibling?.remove()
                                      }}
                                    />
                                  </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                  <div className="relative h-[80vh]">
                                    <Image
                                      src={cert.file_path.replace(
                                        '.pdf',
                                        '.jpg'
                                      )}
                                      alt={cert.course_name}
                                      fill
                                      className="rounded-lg object-contain"
                                      priority
                                    />
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                            <TableCell className="text-right">
                              <Link
                                href={cert.file_path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                              >
                                Xem chứng chỉ
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="mb-4 rounded-full bg-muted p-3">
                      <svg
                        className="size-6 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Chưa có chứng chỉ</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Hoàn thành các khóa học để nhận chứng chỉ
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Bài học gần đây</CardTitle>
                <CardDescription>
                  Các bài học bạn đã hoàn thành gần đây
                </CardDescription>
              </CardHeader>
              <CardContent>
                {courseList && courseList.length > 0 ? (
                  <div className="space-y-4">
                    {courseList
                      .filter((course) => course.recent_lesson)
                      .map((course) => (
                        <div
                          key={course.course_id}
                          className="flex items-start space-x-4 rounded-lg border p-4"
                        >
                          <div className="rounded-full bg-orange-100 p-2">
                            <Clock className="size-4 text-orange-600" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {course.recent_lesson?.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {course.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Hoàn thành:{' '}
                              {course.recent_lesson?.completed_at
                                ? formatDate(course.recent_lesson.completed_at)
                                : ''}
                            </p>
                          </div>
                          <Badge
                            variant={
                              course.status === 'completed'
                                ? 'success'
                                : 'default'
                            }
                            className="ml-auto"
                          >
                            {course.status === 'completed'
                              ? 'Đã hoàn thành'
                              : 'Đang học'}
                          </Badge>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex h-[200px] flex-col items-center justify-center text-muted-foreground">
                    <Clock className="mb-3 size-10" />
                    <p className="text-sm">
                      Chưa có bài học nào được hoàn thành
                    </p>
                    <p className="mt-1 text-xs">
                      Hãy bắt đầu học để xem lịch sử của bạn
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default LearnerInformationView
