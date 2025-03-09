'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'
import { Eye, MoreVertical } from 'lucide-react'

import { formatDate } from '@/lib/common'
import { useGetLearners } from '@/hooks/learner/useLearner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ModalLoading from '@/components/common/ModalLoading'
import { DataTable } from '@/components/shared/data-table'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'

const LearnerManageView = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: learnerData, isLoading } = useGetLearners()

  const filteredData = learnerData?.data?.filter((learner: any) => {
    const searchFields = ['name', 'email']
    return searchFields.some((field) =>
      learner[field]?.toLowerCase()?.includes(searchTerm.toLowerCase())
    )
  })

  const columns: ColumnDef<any>[] = [
    {
      id: 'STT',
      accessorFn: (_row, index) => index + 1,
      cell: ({ getValue }: any) => (
        <div className="text-sm font-medium text-gray-900">{getValue()}</div>
      ),
      size: 50,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Học viên" />
      ),
      cell: ({ row }) => {
        const learner = row.original
        return (
          <div className="flex min-w-80 items-center gap-4">
            <Image
              alt={learner.name ?? ''}
              className="size-10 rounded-lg object-cover"
              height={128}
              width={128}
              src={learner?.avatar ?? ''}
            />
            <div className="flex-1 space-y-1">
              <h3 className="line-clamp-2 font-semibold">{learner.name}</h3>
              <h4 className="text-xs text-muted-foreground">{learner.email}</h4>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'total_courses',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Khoá học đã sở hữu" />
      ),
      cell: ({ row }) => {
        const learner = row.original
        return (
          <h3 className="line-clamp-2 font-semibold">
            {learner.total_courses}
          </h3>
        )
      },
    },
    {
      accessorKey: 'enrolled_at',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Đã tham gia" />
      ),
      cell: ({ row }) => {
        return (
          <div className="space-y-1">
            <div className="font-medium">
              {formatDate(row.original.enrolled_at, {
                dateStyle: 'medium',
              })}
            </div>
          </div>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const learner = row.original
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
                <Link href={`/instructor/learner-manage/info/${learner.code}`}>
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

  if (isLoading) return <ModalLoading />

  return (
    <>
      <div className="px-5 py-6">
        <div className="mt-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Quản lý học viên</h1>
            <Button>Tạo nhóm hỗ trợ học tập</Button>
          </div>
          <DataTable
            columns={columns}
            data={filteredData || []}
            isLoading={isLoading}
            onSearchChange={setSearchTerm}
          />
        </div>
      </div>
    </>
  )
}

export default LearnerManageView
