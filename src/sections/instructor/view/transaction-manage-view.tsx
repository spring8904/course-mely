'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ColumnDef } from '@tanstack/react-table'
import { format, isAfter, isBefore } from 'date-fns'
import { Eye } from 'lucide-react'

import { useGetParticipatedCourses } from '@/hooks/instructor/transaction/useInstructorTransaction'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ModalLoading from '@/components/common/ModalLoading'
import { DataTable } from '@/components/shared/data-table'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'

export default function TransactionManageView() {
  const { data: participatedCourseData, isLoading } =
    useGetParticipatedCourses()
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilters, setDateFilters] = useState<{
    fromDate: Date | null
    toDate: Date | null
  }>({
    fromDate: null,
    toDate: null,
  })

  const filteredData = participatedCourseData?.data?.filter((course: any) => {
    const searchFields = ['course_name', 'student_name', 'invoice_code']
    const matchesSearch = searchFields.some((field) =>
      course[field]?.toLowerCase()?.includes(searchTerm.toLowerCase())
    )
    const courseDate = new Date(course.invoice_created_at)
    const matchesDate =
      (!dateFilters.fromDate || courseDate >= dateFilters.fromDate) &&
      (!dateFilters.toDate || courseDate <= dateFilters.toDate)

    return matchesSearch && matchesDate
  })

  const columns: ColumnDef<any[]>[] = [
    {
      header: 'STT',
      accessorFn: (_row, index) => index + 1,
      cell: ({ getValue }: any) => (
        <div className="text-sm font-medium text-gray-900">{getValue()}</div>
      ),
      size: 50,
    },
    {
      accessorKey: 'invoice_code',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Mã hoá đơn" />
      ),
      cell: ({ row }: any) => {
        const invoice = row.original
        return (
          <p className="text-sm font-medium text-gray-900">
            {invoice.invoice_code}
          </p>
        )
      },
    },
    {
      accessorKey: 'course_name',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Khóa học" />
      ),
      cell: ({ row }: any) => {
        const course = row.original
        return (
          <Image
            alt={course.course_name}
            className="rounded-lg object-cover"
            src={course.course_thumbnail}
            width={64}
            height={64}
          />
        )
      },
    },
    {
      accessorKey: 'student_name',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Học viên" />
      ),
      cell: ({ row }: any) => {
        const course = row.original
        return <p className="text-sm text-gray-600">{course.student_name}</p>
      },
    },
    {
      accessorKey: 'amount_paid',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Số tiền đã thanh toán" />
      ),
      cell: ({ row }: any) => {
        const course = row.original
        return (
          <p className="font-medium text-gray-900">
            {Number(course.amount_paid).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
        )
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Trạng thái" />
      ),
      cell: ({ row }: any) => {
        const course = row.original
        return (
          <Badge variant="success" className="text-sm font-semibold">
            {course.status}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'invoice_created_at',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Ngày mua" />
      ),
      cell: ({ row }: any) => {
        const course = row.original
        return <>{format(new Date(course.invoice_created_at), 'dd/MM/yyyy')}</>
      },
    },
    {
      id: 'actions',
      cell: ({ row }: any) => {
        return (
          <div>
            <Button variant="ghost">
              <Eye />
            </Button>
          </div>
        )
      },
    },
  ]

  if (isLoading) {
    return <ModalLoading />
  }

  return (
    <div className="px-5 py-4">
      <div className="mt-2 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Lịch sử mua hàng</h1>
        </div>
        <DataTable
          columns={columns}
          data={filteredData || []}
          isLoading={false}
          enableDateFilter={true}
          onDateFilterChange={(filters) => setDateFilters(filters)} // Cập nhật bộ lọc ngày
        />
      </div>
    </div>
  )
}
