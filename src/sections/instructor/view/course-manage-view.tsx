'use client'

import { useState } from 'react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronDown, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { ICategory } from '@/types/Category'
import { CreateCoursePayload, createCourseSchema } from '@/validations/course'
import { cn } from '@/lib/utils'
import { useGetCategories } from '@/hooks/category/useCategory'
import {
  useCreateCourse,
  useGetCourses,
} from '@/hooks/instructor/course/useCourse'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const CourseManageView = () => {
  const [openDialog, setOpenDialog] = useState(false)

  const { data: coursesData, isLoading: isCoursesLoading } = useGetCourses()
  const { data: categoryData } = useGetCategories()

  const { mutate: createCourse, isPending: isCourseCreating } =
    useCreateCourse()

  const form = useForm<CreateCoursePayload>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = (values: CreateCoursePayload) => {
    if (isCourseCreating) return

    createCourse(values, {
      onSuccess: () => {
        setOpenDialog(false)
      },
    })
  }

  const isLoading = isCoursesLoading

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
        <div className="mt-2">
          <div className="flex justify-between">
            <p className="text-xl font-bold">Quản lý khóa học</p>
            <Button
              onClick={() => {
                setOpenDialog(true)
              }}
            >
              Tạo khoá học mới
            </Button>
          </div>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Thông tin</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coursesData?.data?.map((course: any, index: number) => (
                <TableRow key={course.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        alt={course.name}
                        className="size-16 shrink-0 rounded-lg object-cover"
                        height={80}
                        src={
                          course.thumbnail ||
                          'https://res.cloudinary.com/dvrexlsgx/image/upload/v1734990491/oxbmdtk4x3jvfhxvhnec.jpg'
                        }
                        width={80}
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="whitespace-nowrap text-sm font-bold lg:text-base">
                          {course.name}
                        </h3>
                        <h4 className="text-xs text-slate-500 lg:text-sm">
                          {course?.category?.name || 'Chưa có danh mục'}
                        </h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-bold lg:text-base">
                      {course?.price?.toLocaleString()}đ
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        'text-white',
                        course.status === 'approved'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      )}
                    >
                      {course.status === 'approved' ? 'Đã duyệt' : 'Chưa duyệt'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <Button className="bg-indigo-600">Chi tiết</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
                              ? categoryData?.data.find(
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
                              {categoryData?.data.map((category: ICategory) => (
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
