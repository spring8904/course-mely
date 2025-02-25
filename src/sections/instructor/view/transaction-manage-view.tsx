'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Eye } from 'lucide-react'

import { useGetParticipatedCourses } from '@/hooks/instructor/transaction/useInstructorTransaction'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DataTable } from '@/components/shared/data-table'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'

export default function TransactionManageView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedTransation, setSelectedTransation] = useState<any>(null)

  const [dateFilters, setDateFilters] = useState<{
    fromDate: Date | null
    toDate: Date | null
  }>({
    fromDate: null,
    toDate: null,
  })

  const formattedFilters = {
    fromDate: dateFilters.fromDate
      ? format(dateFilters.fromDate, 'yyyy-MM-dd')
      : undefined,
    toDate: dateFilters.toDate
      ? format(dateFilters.toDate, 'yyyy-MM-dd')
      : undefined,
  }

  const { data: participatedCourseData, isLoading } =
    useGetParticipatedCourses(formattedFilters)

  const filteredData = participatedCourseData?.data?.filter((course: any) => {
    const searchFields = ['course_name', 'student_name', 'invoice_code']
    return searchFields.some((field) =>
      course[field]?.toLowerCase()?.includes(searchTerm.toLowerCase())
    )
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
        const invoice = row.original
        return (
          <div>
            <Button
              onClick={() => {
                setSelectedTransation(invoice)
                setOpenDialog(true)
              }}
              variant="ghost"
            >
              <Eye />
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="px-5 py-4">
      <div className="mt-2 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Lịch sử mua hàng</h1>
        </div>
        <DataTable
          columns={columns}
          data={filteredData || []}
          isLoading={isLoading}
          enableDateFilter={true}
          onSearchChange={setSearchTerm}
          onDateFilterChange={(filters) => setDateFilters(filters)}
        />
      </div>
      {selectedTransation && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chi tiết hóa đơn</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>
                <strong>Mã hóa đơn:</strong> {selectedTransation.invoice_code}
              </p>
              <p>
                <strong>Khóa học:</strong> {selectedTransation.course_name}
              </p>
              <p>
                <strong>Học viên:</strong> {selectedTransation.student_name}
              </p>
              <p>
                <strong>Số tiền thanh toán:</strong>{' '}
                {Number(selectedTransation.amount_paid).toLocaleString(
                  'vi-VN',
                  {
                    style: 'currency',
                    currency: 'VND',
                  }
                )}
              </p>
              <p>
                <strong>Ngày mua:</strong>{' '}
                {format(
                  new Date(selectedTransation.invoice_created_at),
                  'dd/MM/yyyy'
                )}
              </p>
              <p>
                <strong>Trạng thái:</strong> {selectedTransation.status}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
