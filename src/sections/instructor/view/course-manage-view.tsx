'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { ColumnDef } from '@tanstack/react-table'
import { Eye, Loader2, MoreVertical, SquarePen, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { ICourse } from '@/types'
import { ICategory } from '@/types/Category'
import { CreateCoursePayload, createCourseSchema } from '@/validations/course'
import { formatCurrency, formatDate } from '@/lib/common'
import { useGetCategories } from '@/hooks/category/useCategory'
import {
  useCreateCourse,
  useGetCourses,
} from '@/hooks/instructor/course/useCourse'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import CourseStatusBadge from '@/components/shared/course-status-badge'
import { DataTable } from '@/components/shared/data-table'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'
import FormCombobox from '@/components/shared/form-combobox'

const CourseManageView = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const { data: courses, isLoading: isCoursesLoading } = useGetCourses()
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategories()

  const { mutate: createCourse, isPending: isCourseCreating } =
    useCreateCourse()

  const form = useForm<CreateCoursePayload>({
    resolver: zodResolver(createCourseSchema),
  })

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
      cell: ({ row }) => {
        console.log(row.original)
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

  const categoryOptions = categories?.data.map((category: ICategory) => ({
    label: category.name,
    value: category.id,
  }))

  const onSubmit = (values: CreateCoursePayload) => {
    if (isCourseCreating) return

    createCourse(values, {
      onSuccess: () => {
        setOpenDialog(false)
      },
    })
  }

  return (
    <>
      <div className="px-5 py-6">
        <div className="mt-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Quản lý khóa học</h1>
            <Button
              onClick={() => {
                setOpenDialog(true)
              }}
            >
              Tạo khoá học mới
            </Button>
          </div>

          <DataTable
            columns={columns}
            data={filteredData || []}
            isLoading={isCoursesLoading}
            onSearchChange={setSearchTerm}
          />
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Thêm tiêu đề và chọn danh mục cho khoá học
            </DialogTitle>
            <DialogDescription>
              Bạn có thể thêm tiêu đề và chọn danh mục cho khoá học của mình.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề khoá học</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tiêu đề cho khoá học"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormCombobox
                form={form}
                name="category_id"
                label="Danh mục khóa học"
                options={categoryOptions}
                isLoading={isCategoriesLoading}
                placeholder="Chọn danh mục cho khóa học"
              />
              <div className="mt-3 flex justify-end">
                <Button
                  type="submit"
                  className="bg-primary"
                  disabled={isCourseCreating}
                >
                  {isCourseCreating ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    'Tiếp tục tạo khoá học'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CourseManageView
