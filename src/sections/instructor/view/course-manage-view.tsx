'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { ColumnDef } from '@tanstack/react-table'
import {
  Check,
  ChevronDown,
  Eye,
  Loader2,
  MoreVertical,
  SquarePen,
  Trash2,
} from 'lucide-react'
import { useForm } from 'react-hook-form'

import { CourseStatusMap, ICourse } from '@/types'
import { ICategory } from '@/types/Category'
import { CreateCoursePayload, createCourseSchema } from '@/validations/course'
import { formatCurrency, formatDateTime } from '@/lib/common'
import { cn } from '@/lib/utils'
import { useGetCategories } from '@/hooks/category/useCategory'
import {
  useCreateCourse,
  useGetCourses,
} from '@/hooks/instructor/course/useCourse'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { DataTable } from '@/components/ui/data-table'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const CourseManageView = () => {
  const [openDialog, setOpenDialog] = useState(false)

  const { data: courses, isLoading: isCoursesLoading } = useGetCourses()
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategories()

  const { mutate: createCourse, isPending: isCourseCreating } =
    useCreateCourse()

  const form = useForm<CreateCoursePayload>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      name: '',
    },
  })

  const isLoading = isCoursesLoading || isCategoriesLoading

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
          <div className="flex items-center gap-4">
            <Image
              alt={course.name ?? ''}
              className="size-16 rounded-lg object-cover"
              height={128}
              width={128}
              src={course?.thumbnail ?? ''}
            />
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold">{course.name}</h3>
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
      cell: () => (
        <div className="space-y-1">
          <div className="font-medium">
            {formatDateTime('2025-01-25T15:41:03.000000Z', 'date')}
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDateTime('2025-01-25T15:41:03.000000Z', 'time')}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'price',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Giá bán" />
      ),
      cell: ({ row }) => (
        <div className="font-medium">
          {formatCurrency(row.getValue('price') || 0)}
        </div>
      ),
    },
    {
      accessorKey: 'total_student',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Học viên" />
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trạng thái" />
      ),
      cell: ({ row }) => {
        // const course = CourseStatusMap[row.original.status]

        // return <Badge variant={course.badge}>{course.label}</Badge>

        return Object.values(CourseStatusMap)
          .reverse()
          .map((status, index) => {
            if (row.index === index) {
              return (
                <Badge key={index} variant={status.badge}>
                  {status.label}
                </Badge>
              )
            }
          })
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
              <DropdownMenuItem>
                <Eye /> Xem
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
    },
  ]

  const onSubmit = (values: CreateCoursePayload) => {
    if (isCourseCreating) return

    createCourse(values, {
      onSuccess: () => {
        setOpenDialog(false)
      },
    })
  }

  if (isLoading) {
    return (
      <div className="mt-20">
        <Loader2 className="mx-auto size-8 animate-spin" />
      </div>
    )
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
          <DataTable columns={columns} data={courses?.data} />
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
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Danh mục khóa học</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? categories?.data.find(
                                  (category: ICategory) =>
                                    category.id === field.value
                                )?.name
                              : 'Chọn danh mục cho khóa học'}
                            <ChevronDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Tìm kiếm danh mục"
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>
                              Không có kết quả nào phù hợp
                            </CommandEmpty>
                            <CommandGroup>
                              {categories?.data.map((category: ICategory) => (
                                <CommandItem
                                  value={category.name}
                                  key={category.id}
                                  onSelect={() => {
                                    field.onChange(category.id)
                                  }}
                                >
                                  {category.name}
                                  <Check
                                    className={cn(
                                      'ml-auto',
                                      category.id === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
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
