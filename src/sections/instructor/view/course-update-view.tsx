'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  Check,
  ChevronDown,
  CirclePlus,
  Loader2,
  TableOfContents,
  Target,
  Trash,
  Trash2,
} from 'lucide-react'
import ReactQuill from 'react-quill'
import { useImmer } from 'use-immer'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import 'react-quill/dist/quill.snow.css'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ICategory } from '@/types/Category'
import { UpdateCoursePayload, updateCourseSchema } from '@/validations/course'
import { formatNumber } from '@/lib/common'
import { cn } from '@/lib/utils'
import { useGetCategories } from '@/hooks/category/useCategory'
import {
  useGetCourseOverview,
  useUpdateCourse,
} from '@/hooks/instructor/course/useCourse'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'

import CourseChapterTab from '../_components/courses-update/course-chapter-tab'

interface FAQ {
  question: string
  answers: string
}

const CourseUpdateView = ({ slug }: { slug: string }) => {
  const { user } = useAuthStore()
  const router = useRouter()

  const [benefits, setBenefits] = useState<string[]>(['', '', '', ''])
  const [requirements, setRequirements] = useState<string[]>(['', '', '', ''])
  const [qa, setFaqs] = useImmer<FAQ[]>([
    { question: 'Ví dụ câu hỏi?', answers: 'Ví dụ câu trả lời' },
  ])

  const avatarCourseRef = useRef<HTMLInputElement | null>(null)
  const trailerCourseRef = useRef<HTMLInputElement | null>(null)

  const { data: courseOverviewData, isLoading: isCourseOverviewLoading } =
    useGetCourseOverview(slug)
  const { data: categoryData } = useGetCategories()
  const { mutate: updateCourse, isPending: updateCoursePending } =
    useUpdateCourse()

  const form = useForm<UpdateCoursePayload>({
    resolver: zodResolver(updateCourseSchema),
    defaultValues: {
      name: '',
      category_id: undefined,
      price: 0,
      price_sale: 0,
      description: '',
      benefits: ['', '', '', ''],
      requirements: ['', '', '', ''],
      qa: [{ question: '', answers: '' }],
      level: '' as 'beginner' | 'intermediate' | 'advanced',
      visibility: '' as 'public' | 'private',
      is_free: '0' as '0' | '1',
    },
  })

  useEffect(() => {
    if (
      !isCourseOverviewLoading &&
      user?.id !== courseOverviewData?.data?.user_id
    ) {
      router.push('/forbidden')
    }
  }, [user, courseOverviewData, isCourseOverviewLoading, router])

  useEffect(() => {
    if (courseOverviewData?.data) {
      const data = courseOverviewData.data

      form.reset({
        name: data.name || '',
        category_id: data.category_id || '',
        price: parseFloat(data.price) || 0,
        price_sale: parseFloat(data.price_sale) || 0,
        level: data.level || '',
        description: data.description || '',
        visibility: data.visibility || '',
        is_free: data.is_free || '0',
        benefits: data.benefits || ['', '', '', ''],
        requirements: data.requirements || ['', '', '', ''],
        qa: data.qa || [{ question: '', answers: '' }],
      })

      setBenefits(
        Array.isArray(data.benefits) ? data.benefits : ['', '', '', '']
      )
      setRequirements(
        Array.isArray(data.requirements) ? data.requirements : ['', '', '', '']
      )
      setFaqs(
        Array.isArray(data.qa) ? data.qa : [{ question: '', answers: '' }]
      )
    }
  }, [courseOverviewData, form])

  const handleAddBenefit = () => {
    if (benefits.length < 10) {
      const newBenefits = [...benefits, '']
      setBenefits(newBenefits)
      form.setValue('benefits', newBenefits)
    }
  }

  const handleAddRequirement = () => {
    if (requirements.length < 10) {
      const newRequirements = [...requirements, '']
      setRequirements(newRequirements)
      form.setValue('requirements', newRequirements)
    }
  }

  const handleAddQA = () => {
    if (qa.length < 10) {
      setFaqs((draft) => {
        draft.push({ question: '', answers: '' })
      })
      form.setValue('qa', qa)
    }
  }

  const handleRemoveBenefit = (index: number) => {
    const newBenefits = benefits.filter((_, i) => i !== index)
    setBenefits(newBenefits)
    form.setValue('benefits', newBenefits)
  }

  const handleRemoveRequirement = (index: number) => {
    const newRequirements = requirements.filter((_, i) => i !== index)
    setRequirements(newRequirements)
    form.setValue('requirements', newRequirements)
  }

  const handleRemoveQA = (index: number) => {
    setFaqs((draft) => {
      draft.splice(index, 1)
    })
    form.setValue('qa', qa)
  }

  const onSubmit = (data: UpdateCoursePayload) => {
    if (data.is_free === '1') {
      data.price = 0
      data.price_sale = 0
    }

    const formData = {
      ...data,
      benefits: benefits.filter((benefit) => benefit.trim() !== ''),
      requirements: requirements.filter(
        (requirement) => requirement.trim() !== ''
      ),
      qa: qa.filter(
        (faq) => faq.question.trim() !== '' && faq.answers.trim() !== ''
      ),
    }

    updateCourse({ data: formData, slug })
  }

  if (isCourseOverviewLoading) {
    return (
      <div className="mt-20">
        <Loader2 className="mx-auto size-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="px-5 py-6">
      <div className="mt-2">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">
            Cập nhật nội dung khoá học: {courseOverviewData?.data.name}
          </h3>
          <div className="flex flex-col gap-2">
            <Button className="bg-primary">Gửi yêu cầu duyệt khoá học</Button>
            <div>
              <span className="text-base">Tiến trình</span>
              <Progress value={90} />
            </div>
          </div>
        </div>

        <Tabs defaultValue="courseInfo">
          <Card className="mt-6 rounded-md px-4 py-3">
            <TabsList className="flex justify-between gap-2">
              <TabsTrigger
                value="courseInfo"
                className={cn(
                  'w-full px-4 py-2 text-foreground',
                  'data-[state=active]:cursor-default data-[state=active]:!bg-primary data-[state=active]:text-primary-foreground',
                  'hover:bg-primary/80 hover:text-white'
                )}
              >
                <div className="flex gap-2">
                  <TableOfContents size={18} />
                  <span className="font-medium">Nội dung khoá học</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="courseBenefits"
                className={cn(
                  'w-full px-4 py-2 text-foreground',
                  'data-[state=active]:cursor-default data-[state=active]:!bg-primary data-[state=active]:text-primary-foreground',
                  'hover:bg-primary/80 hover:text-white'
                )}
              >
                <div className="flex gap-2">
                  <Target size={18} />
                  <span className="font-medium">Mục tiêu khoá học</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="courseChapter"
                className={cn(
                  'w-full px-4 py-2 text-foreground',
                  'data-[state=active]:cursor-default data-[state=active]:!bg-primary data-[state=active]:text-primary-foreground',
                  'hover:bg-primary/80 hover:text-white'
                )}
              >
                <div className="flex gap-2">
                  <TableOfContents size={18} />
                  <span className="font-medium">Chương trình giảng dạy</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </Card>

          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <TabsContent value="courseInfo" className="m-0">
                  <Card className="rounded-md">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold">
                            Thông tin khoá học
                          </h3>
                          <p className="mt-2 text-sm font-normal">
                            Thông tin sẽ được hiển thị trên trang Tổng quan, dễ
                            dàng tiếp cận Học viên hơn.
                          </p>
                        </div>
                        <div>
                          <Button variant="destructive">Nhập lại</Button>
                          <Button
                            type="submit"
                            className="ms-2 bg-primary"
                            disabled={updateCoursePending}
                          >
                            {updateCoursePending ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              'Lưu thông tin'
                            )}
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
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
                        <p className="mt-2 text-[14px] text-[#4b5563]">
                          Tiêu đề của bạn không những phải thu hút sự chú ý,
                          chứa nhiều thông tin mà còn được tối ưu hóa để dễ tìm
                          kiếm
                        </p>
                      </div>

                      <div className="mt-3">
                        <Label className="text-base font-semibold">
                          Mô tả khoá học
                        </Label>
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <ReactQuill
                                  {...field}
                                  value={field.value || ''}
                                  onChange={field.onChange}
                                  className="custom-quill mt-2"
                                  theme="snow"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <p className="mt-2 text-[14px] text-[#4b5563]">
                          Mô tả phải dài ít nhất là 200 từ.
                        </p>
                      </div>
                      <div className="mt-3">
                        <Label className="text-base font-semibold">
                          Giá khoá học
                        </Label>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="Nhập giá khoá học"
                                    {...field}
                                    value={formatNumber(field.value || 0)}
                                    onChange={(e) => {
                                      const rawValue = e.target.value.replace(
                                        /\D/g,
                                        ''
                                      )
                                      field.onChange(
                                        rawValue ? parseInt(rawValue, 10) : 0
                                      )
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="price_sale"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="Giá khuyến mãi"
                                    {...field}
                                    value={formatNumber(field.value || 0)}
                                    onChange={(e) => {
                                      const rawValue = e.target.value.replace(
                                        /\D/g,
                                        ''
                                      )
                                      field.onChange(
                                        rawValue ? parseInt(rawValue, 10) : 0
                                      )
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <Label className="text-base font-semibold">
                          Thông tin cơ bản
                        </Label>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="mt-3">
                            <FormField
                              control={form.control}
                              name="category_id"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant="outline"
                                          role="combobox"
                                          className={cn(
                                            'justify-between',
                                            !field.value &&
                                              'text-muted-foreground'
                                          )}
                                        >
                                          {field.value
                                            ? (categoryData?.data.find(
                                                (category: ICategory) =>
                                                  category.id === field.value
                                              )?.name ??
                                              'Chọn danh mục cho khóa học')
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
                                            {categoryData?.data.map(
                                              (category: ICategory) => (
                                                <CommandItem
                                                  value={category.name}
                                                  key={category.id}
                                                  onSelect={() =>
                                                    field.onChange(category.id)
                                                  }
                                                >
                                                  {category.name}
                                                  <Check
                                                    className={cn(
                                                      'ml-auto',
                                                      category.id ===
                                                        field.value
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                    )}
                                                  />
                                                </CommandItem>
                                              )
                                            )}
                                          </CommandGroup>
                                        </CommandList>
                                      </Command>
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="mt-3">
                            <FormField
                              control={form.control}
                              name="level"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Select
                                      key={field.value}
                                      onValueChange={field.onChange}
                                      value={field.value}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Chọn cấp độ" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="beginner">
                                          Cơ bản
                                        </SelectItem>
                                        <SelectItem value="intermediate">
                                          Nâng cao
                                        </SelectItem>
                                        <SelectItem value="advanced">
                                          Chuyên sâu
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="mt-3">
                            <FormField
                              control={form.control}
                              name="visibility"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Select
                                      key={field.value}
                                      value={field.value}
                                      onValueChange={field.onChange}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Trạng thái khoá học" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="public">
                                          Công khai
                                        </SelectItem>
                                        <SelectItem value="private">
                                          Riêng tư
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex space-x-4">
                        <div className="flex-1">
                          <Label className="text-base font-semibold">
                            Ảnh đại diện
                          </Label>
                          <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                              <FormItem>
                                <div className="relative mt-3">
                                  <div
                                    className="flex h-[200px] w-full items-center justify-center rounded-lg bg-primary"
                                    style={{
                                      backgroundImage: field.value
                                        ? `url(${URL.createObjectURL(field.value)})`
                                        : 'none',
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                    }}
                                    onClick={() =>
                                      avatarCourseRef.current?.click()
                                    }
                                  >
                                    {!field.value && (
                                      <p className="cursor-pointer text-white">
                                        Thêm ảnh đại diện
                                      </p>
                                    )}
                                  </div>
                                  {field.value && (
                                    <button
                                      onClick={() => {
                                        if (avatarCourseRef.current) {
                                          avatarCourseRef.current.value = ''
                                        }
                                        field.onChange(null)
                                      }}
                                      className="absolute right-0 top-0 p-2 text-white opacity-80 transition-opacity duration-200 ease-in-out hover:opacity-100"
                                    >
                                      <Trash2 />
                                    </button>
                                  )}
                                  <div className="hidden">
                                    <p>Tải hình ảnh khoá học lên tại đây</p>
                                    <div className="mt-3">
                                      <Input
                                        ref={avatarCourseRef}
                                        id="thumbnail"
                                        type="file"
                                        onChange={(e) => {
                                          if (e.target.files?.length) {
                                            const file = e.target.files[0]
                                            field.onChange(file)
                                          }
                                        }}
                                        accept="image/png, image/jpeg, image/jpg"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex-1">
                          <Label className="text-base font-semibold">
                            Video giới thiệu
                          </Label>
                          <FormField
                            control={form.control}
                            name="intro"
                            render={({ field }) => (
                              <FormItem>
                                <div className="relative mt-3">
                                  <div className="flex h-[200px] w-full items-center justify-center rounded-lg bg-primary">
                                    {field.value ? (
                                      <video
                                        className="size-full rounded-lg object-cover"
                                        controls
                                        src={
                                          field.value instanceof File
                                            ? URL.createObjectURL(field.value)
                                            : undefined
                                        }
                                      />
                                    ) : (
                                      <p
                                        className="cursor-pointer text-white"
                                        onClick={() =>
                                          trailerCourseRef.current?.click()
                                        }
                                      >
                                        Thêm video giới thiệu
                                      </p>
                                    )}
                                  </div>
                                  {field.value && (
                                    <button
                                      onClick={() => {
                                        if (trailerCourseRef.current) {
                                          trailerCourseRef.current.value = ''
                                        }
                                        field.onChange(null)
                                      }}
                                      className="absolute right-0 top-0 p-2 text-white opacity-80 transition-opacity duration-200 ease-in-out hover:opacity-100"
                                    >
                                      <Trash2 />
                                    </button>
                                  )}
                                  <div className="hidden">
                                    <p>Tải video khoá học lên tại đây</p>
                                    <div className="mt-3">
                                      <Input
                                        ref={trailerCourseRef}
                                        id="intro"
                                        type="file"
                                        onChange={(e) => {
                                          if (e.target.files?.length) {
                                            const file = e.target.files[0]
                                            field.onChange(file)
                                          }
                                        }}
                                        accept="video/mp4, video/webm, video/ogg"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <Label className="text-base font-semibold">
                          Miễn phí
                        </Label>
                        <FormField
                          control={form.control}
                          name="is_free"
                          render={({ field }) => (
                            <FormItem className="mt-3">
                              <FormControl>
                                <Select
                                  key={field.value}
                                  onValueChange={(value) =>
                                    field.onChange(Number(value))
                                  }
                                  value={String(field.value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Miễn phí hay không?" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value={String(1)}>
                                      Miễn phí
                                    </SelectItem>
                                    <SelectItem value={String(0)}>
                                      Có phí
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="courseBenefits" className="m-0">
                  <Card className="rounded-md">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold">
                            Mục tiêu khoá học
                          </h3>
                          <p className="mt-2 text-sm font-normal">
                            Thông tin sẽ được hiển thị trên trang Tổng quan, dễ
                            dàng tiếp cận Học viên hơn.
                          </p>
                        </div>
                        <div>
                          <Button variant="destructive">Nhập lại</Button>
                          <Button
                            type="submit"
                            className="ms-2 bg-primary"
                            disabled={updateCoursePending}
                          >
                            {updateCoursePending ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              'Lưu thông tin'
                            )}
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <FormField
                          control={form.control}
                          name="benefits"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Lợi ích mà khóa học mang lại
                              </FormLabel>
                              <p className="text-[14px] text-[#4b5563]">
                                Bạn phải nhập ít nhất 4 lợi ích mà Học viên có
                                thể nhận được sau khi kết thúc khóa học.
                              </p>
                              <FormControl>
                                <div>
                                  {benefits.map((benefit, index) => (
                                    <div key={index} className="relative mt-3">
                                      <Input
                                        {...field}
                                        placeholder={`Nhập lợi ích số ${index + 1}`}
                                        className="h-[40px] pr-10"
                                        value={benefit}
                                        onChange={(e) => {
                                          const newBenefits = [...benefits]
                                          newBenefits[index] = e.target.value
                                          setBenefits(newBenefits)
                                          form.setValue('benefits', newBenefits)
                                        }}
                                      />
                                      {index >= 4 && (
                                        <button
                                          type="button"
                                          className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500"
                                          onClick={() =>
                                            handleRemoveBenefit(index)
                                          }
                                        >
                                          <Trash size={16} />
                                        </button>
                                      )}
                                    </div>
                                  ))}
                                  <div className="mt-3">
                                    <Button
                                      type="button"
                                      disabled={benefits.length >= 10}
                                      onClick={handleAddBenefit}
                                    >
                                      <CirclePlus size={18} />
                                      Thêm lợi ích vào khóa học của bạn
                                    </Button>
                                    {benefits.length >= 10 && (
                                      <p className="mt-2 text-sm text-red-500">
                                        Bạn đã đạt tối đa 10 lợi ích.
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mt-6">
                        <FormField
                          control={form.control}
                          name="requirements"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Yêu cầu khi tham gia khóa học
                              </FormLabel>
                              <p className="text-[14px] text-[#4b5563]">
                                Liệt kê các kỹ năng, kinh nghiệm, công cụ hoặc
                                thiết bị mà học viên bắt buộc phải có trước khi
                                tham gia khóa học.
                              </p>
                              <FormControl>
                                <div>
                                  {requirements.map((requirement, index) => (
                                    <div key={index} className="relative mt-3">
                                      <Input
                                        {...field}
                                        placeholder={`Nhập yêu cầu số ${index + 1}`}
                                        className="h-[40px] pr-10"
                                        value={requirement}
                                        onChange={(e) => {
                                          const newRequirements = [
                                            ...requirements,
                                          ]
                                          newRequirements[index] =
                                            e.target.value
                                          setRequirements(newRequirements)
                                          form.setValue(
                                            'requirements',
                                            newRequirements
                                          )
                                        }}
                                      />
                                      {index >= 4 && (
                                        <button
                                          type="button"
                                          className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500"
                                          onClick={() =>
                                            handleRemoveRequirement(index)
                                          }
                                        >
                                          <Trash size={16} />
                                        </button>
                                      )}
                                    </div>
                                  ))}
                                  <div className="mt-3">
                                    <Button
                                      type="button"
                                      disabled={requirements.length >= 10}
                                      onClick={handleAddRequirement}
                                    >
                                      <CirclePlus size={18} />
                                      Thêm yêu cầu vào khóa học của bạn
                                    </Button>
                                    {requirements.length >= 10 && (
                                      <p className="mt-2 text-sm text-red-500">
                                        Bạn đã đạt tối đa 10 yêu cầu.
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mt-6">
                        <FormField
                          control={form.control}
                          name="qa"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Câu hỏi thường gặp</FormLabel>
                              <p className="text-[14px] text-[#4b5563]">
                                Thêm các câu hỏi và câu trả lời thường gặp về
                                khóa học.
                              </p>
                              <FormControl>
                                <div>
                                  {qa.map((faq, index) => (
                                    <div
                                      key={index}
                                      className="relative mt-3 grid grid-cols-2 gap-2"
                                    >
                                      <Input
                                        placeholder={`Câu hỏi ${index + 1}`}
                                        className="h-[40px]"
                                        value={faq.question}
                                        onChange={(e) => {
                                          setFaqs((draft) => {
                                            draft[index].question =
                                              e.target.value
                                          })
                                          field.onChange(qa)
                                        }}
                                      />
                                      <div className="relative">
                                        <Input
                                          placeholder={`Câu trả lời ${index + 1}`}
                                          className="h-[40px] pr-10"
                                          value={faq.answers}
                                          onChange={(e) => {
                                            setFaqs((draft) => {
                                              draft[index].answers =
                                                e.target.value
                                            })
                                            field.onChange(qa)
                                          }}
                                        />
                                        {index >= 1 && (
                                          <button
                                            type="button"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500"
                                            onClick={() =>
                                              handleRemoveQA(index)
                                            }
                                          >
                                            <Trash size={16} />
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                  <div className="mt-3">
                                    <Button
                                      type="button"
                                      disabled={qa.length >= 10}
                                      onClick={handleAddQA}
                                    >
                                      <CirclePlus size={18} />
                                      Thêm câu hỏi và câu trả lời
                                    </Button>
                                    {qa.length >= 10 && (
                                      <p className="mt-2 text-sm text-red-500">
                                        Bạn đã đạt tối đa 10 câu hỏi.
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </form>
            </Form>
            <TabsContent value="courseChapter" className="m-0">
              <CourseChapterTab
                slug={slug}
                chapters={courseOverviewData?.data.chapters}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default CourseUpdateView
