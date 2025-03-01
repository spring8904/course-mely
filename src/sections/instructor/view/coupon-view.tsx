'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Eye, MoreVertical, SquarePen, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'

import QUERY_KEY from '@/constants/query-key'
import {
  useGetCoupons,
  useToggleStatus,
} from '@/hooks/instructor/coupon/useCoupon'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { DataTable } from '@/components/shared/data-table'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'

const CouponView = () => {
  const queryClient = useQueryClient()

  const [searchTerm, setSearchTerm] = useState('')

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

  const { data: dataCoupon, isLoading } = useGetCoupons(formattedFilters)
  const { mutate: toggleStatus, isPending: isPendingToggleStatus } =
    useToggleStatus()

  const filteredData = dataCoupon?.data?.filter((coupon: any) => {
    const searchFields = ['code', 'name', 'description']
    return searchFields.some((field) =>
      coupon[field]?.toLowerCase()?.includes(searchTerm.toLowerCase())
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
      accessorKey: 'code',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Mã" />
      ),
      cell: ({ row }: any) => {
        const coupon = row.original
        return (
          <p className="text-sm font-medium text-gray-900">{coupon.code}</p>
        )
      },
    },
    {
      accessorKey: 'name',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Tên mã" />
      ),
      cell: ({ row }: any) => {
        const coupon = row.original
        return (
          <p className="text-sm font-medium text-gray-900">{coupon.name}</p>
        )
      },
    },
    {
      accessorKey: 'discount_type',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Loại mã" />
      ),
      cell: ({ row }: any) => {
        const coupon = row.original
        return (
          <>
            {coupon.discount_type === 'percentage' ? (
              <Badge variant="success">Phần trăm</Badge>
            ) : (
              <Badge variant="info">Theo tiền</Badge>
            )}
          </>
        )
      },
    },
    {
      accessorKey: 'max_usage',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Số lượng sử dụng" />
      ),
      cell: ({ row }: any) => {
        const coupon = row.original
        return (
          <p className="font-medium text-gray-900">
            {coupon.max_usage !== null ? coupon.max_usage : 'Không giới hạn'}
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
        const coupon = row.original

        console.log(coupon.status)
        const handleToggle = (checked: boolean) => {
          const action = checked ? 'enable' : 'disable'

          toggleStatus(
            {
              id: coupon.id,
              action,
            },
            {
              onSuccess: async (res: any) => {
                toast.success(res.message)

                await queryClient.invalidateQueries({
                  queryKey: [QUERY_KEY.INSTRUCTOR_COUPON],
                })
              },
              onError: (error: any) => {
                toast.success(error.message)
              },
            }
          )
        }

        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={coupon.status == 1}
              onCheckedChange={handleToggle}
              disabled={isPendingToggleStatus}
            />
            <span className="text-sm font-medium">
              {coupon.status == 1 ? 'Hoạt động' : 'Không hoạt động'}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'created_at',
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Ngày tạo" />
      ),
      cell: ({ row }: any) => {
        const coupon = row.original
        return <>{format(new Date(coupon.created_at), 'dd/MM/yyyy')}</>
      },
    },
    {
      id: 'actions',
      cell: ({ row }: any) => {
        const coupon = row.original
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
                <Link href={`/instructor/coupon/${coupon.id}`}>
                  <Eye /> Xem
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/instructor/coupon/update/${coupon.id}`}>
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
    },
  ]

  return (
    <>
      <div className="px-5 py-6">
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Mã giảm giá</h1>
            <Link href="/instructor/coupon/create">
              <Button>Tạo mã</Button>
            </Link>
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
    </>
  )
}

export default CouponView
