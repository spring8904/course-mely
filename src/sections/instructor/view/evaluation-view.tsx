'use client'

import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Eye } from 'lucide-react'

import { useGetEvaluations } from '@/hooks/instructor/evaluation/useEvaluation'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DataTable } from '@/components/shared/data-table'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'

const EvaluationView = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFeedback, setSelectedFeedback] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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

  const { data: dataFeedback, isLoading } = useGetEvaluations(formattedFilters)

  const openDialog = (feedback: any) => {
    setSelectedFeedback(feedback)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setSelectedFeedback(null)
    setIsDialogOpen(false)
  }

  const getValueByPath = (obj: any, path: string) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj)
  }

  const filteredData = dataFeedback?.data?.filter((feedBack: any) => {
    const searchFields = ['content', 'rate', 'user.name', 'course.name']

    return searchFields.some((field) => {
      const value: any = getValueByPath(feedBack, field)

      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchTerm.toLowerCase())
      }

      if (typeof value === 'number') {
        return value.toString().includes(searchTerm)
      }

      return false
    })
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
      accessorKey: 'name',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Khoá học" />
      ),
      cell: ({ row }: any) => {
        const feedback = row.original
        return (
          <p className="text-sm font-medium text-gray-900">
            {feedback.course.name}
          </p>
        )
      },
    },
    {
      accessorKey: 'user',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Học viên" />
      ),
      cell: ({ row }: any) => {
        const feedback = row.original
        return (
          <p className="text-sm font-medium text-gray-900">
            {feedback.user.name}
          </p>
        )
      },
    },
    {
      accessorKey: 'rate',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Số sao đánh giá" />
      ),
      cell: ({ row }: any) => {
        const feedback = row.original
        const stars = Array.from({ length: feedback.rate }, (_, i) => (
          <span key={i}>⭐</span>
        ))
        return (
          <div className="flex items-center font-medium text-gray-900">
            {stars.length > 0 ? stars : 'Chưa đánh giá'}{' '}
          </div>
        )
      },
    },
    {
      accessorKey: 'created_at',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Ngày đánh giá" />
      ),
      cell: ({ row }: any) => {
        const feedback = row.original
        return <>{format(new Date(feedback.created_at), 'dd/MM/yyyy')}</>
      },
    },
    {
      id: 'actions',
      cell: ({ row }: any) => {
        const feedback = row.original
        return (
          <Button variant="ghost" onClick={() => openDialog(feedback)}>
            <Eye />
          </Button>
        )
      },
    },
  ]

  return (
    <>
      <div className="px-5 py-6">
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Danh sách đánh giá
            </h1>
          </div>
        </div>
        <div className="mt-4">
          <DataTable
            columns={columns}
            data={filteredData || []}
            isLoading={isLoading}
            enableDateFilter={true}
            onSearchChange={setSearchTerm}
            onDateFilterChange={(filters) => setDateFilters(filters)}
          />
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Thông tin đánh giá
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Xem chi tiết về đánh giá của học viên.
            </DialogDescription>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-3">
              <p>
                <strong>Học viên:</strong> {selectedFeedback.user.name}
              </p>
              <p>
                <strong>Khoá học:</strong> {selectedFeedback.course.name}
              </p>
              <p>
                <strong>Số sao:</strong> {selectedFeedback.rate} ⭐
              </p>
              <p>
                <strong>Nội dung đánh giá:</strong>{' '}
                {selectedFeedback.content || 'Không có'}
              </p>
              <p>
                <strong>Ngày đánh giá:</strong>{' '}
                {format(new Date(selectedFeedback.created_at), 'dd/MM/yyyy')}
              </p>
            </div>
          )}
          <DialogFooter>
            <button
              onClick={closeDialog}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Đóng
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EvaluationView
