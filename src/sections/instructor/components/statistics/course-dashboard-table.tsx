'use client'
import { formatCurrency, formatPercentage } from '@/lib/common'

import { DataTable } from '@/components/shared/data-table'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useGetCourseRevenueStatistics } from '@/hooks/instructor/use-statistic'
import { CourseRevenueStatistics } from '@/types/Statistics'
import { ColumnDef } from '@tanstack/react-table'
import { Eye, MoreVertical, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const CourseDashboardTable = () => {
  const { data, isLoading } = useGetCourseRevenueStatistics()

  const columns: ColumnDef<CourseRevenueStatistics>[] = [
    {
      accessorKey: 'name',

      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Khóa học" />
      ),
      cell: ({ row }) => {
        const course = row.original
        return (
          <div className="flex min-w-80 items-center gap-4">
            <Image
              alt={course.name ?? ''}
              className="size-16 rounded-lg object-cover"
              height={128}
              width={128}
              src={course?.thumbnail ?? ''}
            />
            <div className="flex-1 space-y-1">
              <h3 className="line-clamp-2 font-semibold">{course.name}</h3>
              <h4 className="text-xs text-muted-foreground">
                {course.name_category}
              </h4>
            </div>
          </div>
        )
      },
    },

    {
      accessorKey: 'price',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Giá bán" />
      ),
      cell: ({ row }) => {
        const price = Number(row.getValue('price')) || 0

        return (
          <div className="font-medium">
            {price === 0 ? 'Miễn phí' : formatCurrency(price)}
          </div>
        )
      },
    },
    {
      accessorKey: 'total_revenue',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tổng doanh thu" />
      ),
      cell: ({ row }) => {
        const price = Number(row.getValue('total_revenue')) || 0

        return <div className="font-medium">{formatCurrency(price)}</div>
      },
    },
    {
      accessorKey: 'total_student',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Học viên" />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('total_student') || 0}</div>
      ),
    },
    {
      accessorKey: 'avg_rating',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Đánh giá trung bình" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1">
            {row.original.avg_rating}{' '}
            <Star
              className="size-4 text-yellow-400"
              strokeWidth={0}
              fill="currentColor"
            />
          </div>
        )
      },
    },
    {
      accessorKey: 'avg_progress',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tỉ lệ hoàn thành" />
      ),
      cell: ({ row }) => {
        return formatPercentage(
          row.original.avg_progress ? +row.original.avg_progress : 0
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const course = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="size-8 rounded-full p-0 hover:bg-gray-200/70"
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/instructor/courses/${course.slug}`}>
                  <Eye /> Xem
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      meta: {
        className: 'sticky right-0 bg-background',
      },
    },
  ]
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
      <CardContent className="px-2 pt-4 sm:px-4 sm:pt-6">
        <DataTable columns={columns} data={data} isLoading={isLoading} />
      </CardContent>
    </Card>
  )
}
export default CourseDashboardTable
