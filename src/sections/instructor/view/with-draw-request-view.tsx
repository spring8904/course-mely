'use client'

import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Eye } from 'lucide-react'

import { useGetWithDrawalRequests } from '@/hooks/wallet/useWallet'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/data-table'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'
import DialogWithDrawRequest from '@/sections/instructor/components/with-draw-request/dialog-with-draw-request'

const WithDrawRequestView = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [selectWithDraw, setSelectWithDraw] = useState<string>('')
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

  const { data: withDrawRequestData, isLoading } =
    useGetWithDrawalRequests(formattedFilters)

  console.log(withDrawRequestData)

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
      accessorKey: 'bank_name',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Ngân hàng" />
      ),
      cell: ({ row }: any) => {
        const withDrawRequest = row.original
        return (
          <p className="text-sm text-gray-600">{withDrawRequest.bank_name}</p>
        )
      },
    },
    {
      accessorKey: 'account_number',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Số tài khoản" />
      ),
      cell: ({ row }: any) => {
        const withDrawRequest = row.original
        return (
          <p className="text-sm text-gray-600">
            {withDrawRequest.account_number}
          </p>
        )
      },
    },
    {
      accessorKey: 'account_holder',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Chủ tài khoản" />
      ),
      cell: ({ row }: any) => {
        const withDrawRequest = row.original
        return (
          <p className="text-sm text-gray-600">
            {withDrawRequest.account_holder}
          </p>
        )
      },
    },
    {
      accessorKey: 'amount',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Số tiền " />
      ),
      cell: ({ row }: any) => {
        const withDrawRequest = row.original
        return (
          <p className="font-medium text-gray-900">
            {Number(withDrawRequest.amount).toLocaleString('vi-VN', {
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
        const withDrawRequest = row.original
        let variant = 'default'

        switch (withDrawRequest.status) {
          case 'Đang xử lý':
            variant = 'warning'
            break
          case 'Đã xử lý':
            variant = 'secondary'
            break
          case 'Chờ xác nhận lại':
            variant = 'info'
            break
          case 'Từ chối':
            variant = 'destructive'
            break
          case 'Hoàn thành':
            variant = 'success'
            break
          default:
            variant = 'default'
        }

        return (
          <>
            <Badge
              variant={variant as any}
              className="text-sm font-semibold capitalize"
            >
              {withDrawRequest.status}
            </Badge>
          </>
        )
      },
    },
    {
      accessorKey: 'request_date',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Ngày gửi yêu cầu" />
      ),
      cell: ({ row }: any) => {
        const withDrawRequest = row.original
        return (
          <>{format(new Date(withDrawRequest.request_date), 'dd/MM/yyyy')}</>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }: any) => {
        const withDrawRequest = row.original
        return (
          <div>
            <Button
              onClick={() => {
                setOpenDialog(true)
                setSelectWithDraw(withDrawRequest.id)
              }}
            >
              <Eye />
            </Button>
          </div>
        )
      },
    },
  ]

  const filteredData = withDrawRequestData?.data?.filter(
    (withDrawRequest: any) => {
      const searchFields = ['bank_name', 'account_number', 'account_holder']
      return searchFields.some((field) =>
        withDrawRequest[field]
          ?.toLowerCase()
          ?.includes(searchTerm.toLowerCase())
      )
    }
  )

  return (
    <>
      <div className="px-5 py-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-2xl font-bold">
            Yêu cầu rút tiền
          </h2>
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
      {openDialog && (
        <DialogWithDrawRequest
          selectWithDraw={selectWithDraw}
          open={openDialog}
          onOpenChange={setOpenDialog}
        />
      )}
    </>
  )
}

export default WithDrawRequestView
