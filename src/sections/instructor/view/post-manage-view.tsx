'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Eye } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useGetPosts } from '@/hooks/instructor/post/usePost'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/data-table'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'

const PostManageView = () => {
  const { data: postData, isLoading } = useGetPosts()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = postData?.data?.filter((post: any) => {
    const searchFields = ['title', 'description', 'content']
    return searchFields.some((field) =>
      post[field]?.toLowerCase()?.includes(searchTerm.toLowerCase())
    )
  })

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'index',
      header: '#',
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: 'title',
      header: 'Thông tin',
      cell: ({ row }) => {
        const post = row.original
        return (
          <div className="flex items-center gap-3">
            <Image
              alt={post.title ?? ''}
              className="size-[100px] rounded-lg"
              height={100}
              src={
                post.thumbnail ||
                'https://res.cloudinary.com/dvrexlsgx/image/upload/v1734990491/oxbmdtk4x3jvfhxvhnec.jpg'
              }
              width={100}
            />
            <div className="flex flex-col gap-1">
              <h3 className="whitespace-nowrap text-sm font-bold lg:text-base">
                {post.title}
              </h3>
              <h4 className="text-xs text-slate-500 lg:text-sm">
                {post?.category?.name || 'Chưa có danh mục'}
              </h4>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => {
        const status = row.original.status as keyof typeof statusMap
        const statusMap: Record<string, { label: string; color: string }> = {
          draft: { label: 'Nháp', color: 'bg-gray-500' },
          pending: { label: 'Chờ duyệt', color: 'bg-yellow-500' },
          approved: { label: 'Đã duyệt', color: 'bg-green-500' },
          published: { label: 'Đã xuất bản', color: 'bg-blue-500' },
          private: { label: 'Riêng tư', color: 'bg-purple-500' },
        }

        const { label, color } = statusMap[status] || {
          label: 'Không xác định',
          color: 'bg-red-500',
        }

        return <Badge className={cn('text-white', color)}>{label}</Badge>
      },
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày tạo" />
      ),
      cell: ({ row }) => (
        <span>
          {format(new Date(row.original.created_at), 'dd/MM/yyyy HH:mm')}
        </span>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Hành động',
      cell: ({ row }) => (
        <div className="flex gap-3">
          <Link href={`/instructor/posts/update/${row.original.slug}`}>
            <Button type="button">
              <Eye />
            </Button>
          </Link>
        </div>
      ),
    },
  ]

  return (
    <div className="px-5 py-6">
      <div className="mt-2">
        <div className="flex justify-between">
          <p className="text-xl font-bold">Quản lý bài viết</p>
          <Link href={'/instructor/posts/create'}>
            <Button>Viết blog</Button>
          </Link>
        </div>

        <DataTable
          isLoading={isLoading}
          columns={columns}
          data={filteredData || []}
          onSearchChange={setSearchTerm}
        />
      </div>
    </div>
  )
}

export default PostManageView
