'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Eye, MoreVertical, SquarePen, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { useGetCourses } from '@/hooks/instructor/course/useCourse'
import { formatCurrency, formatDate } from '@/lib/common'
import { ICourse } from '@/types'

import CourseStatusBadge from '@/components/shared/course-status-badge'
import { DataTable } from '@/components/shared/data-table'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import CreateCourseDialog from '../components/course-management/create-course-dialog'

const CourseManageView = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: courses, isLoading: isCoursesLoading } = useGetCourses()

  const filteredData = courses?.data?.filter((course: any) => {
    const searchFields = ['code', 'name', 'description']
    return searchFields.some((field) =>
      course[field]?.toLowerCase()?.includes(searchTerm.toLowerCase())
    )
  })

  const columns: ColumnDef<ICourse>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border-foreground"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-foreground"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
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
                {course.category?.name}
              </h4>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày tạo" />
      ),
      cell: () => {
        return (
          <div className="space-y-1">
            <div className="font-medium">
              {formatDate('2025-01-25T15:41:03.000000Z', {
                dateStyle: 'medium',
              })}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDate('2025-01-25T15:41:03.000000Z', {
                timeStyle: 'short',
                hour12: true,
              })}
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
        const isFree = row.original.is_free
        const price = Number(row.getValue('price')) || 0

        return (
          <div className="font-medium">
            {isFree || price === 0 ? 'Miễn phí' : formatCurrency(price)}
          </div>
        )
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
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trạng thái" />
      ),
      cell: ({ row }) => {
        return <CourseStatusBadge status={row.original.status} />
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
              <DropdownMenuItem asChild>
                <Link href={`/instructor/courses/update/${course.slug}`}>
                  <SquarePen /> Sửa
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                <Trash2 /> Xóa
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
    <>
      <div className="px-5 py-6">
        <div className="mt-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Quản lý khóa học</h1>
            <CreateCourseDialog />
          </div>

          <DataTable
            columns={columns}
            data={filteredData || []}
            isLoading={isCoursesLoading}
            onSearchChange={setSearchTerm}
          />
        </div>
      </div>
    </>
  )
}

export default CourseManageView
