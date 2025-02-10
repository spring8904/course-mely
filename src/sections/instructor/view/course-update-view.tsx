'use client'

import { useEffect, useRef, useState } from 'react'
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
import { chapterData } from '@/sections/courses/data/data'

import 'react-quill/dist/quill.snow.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ICategory } from '@/types/Category'
import { UpdateCoursePayload, updateCourseSchema } from '@/validations/course'
import { cn } from '@/lib/utils'
import { useGetCategories } from '@/hooks/categories/useCategory'
import { useGetCourseOverview } from '@/hooks/instructors/courses/useCourse'

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

import CourseChapterTab from '../_components/courses-update/course-chapter-tab'

interface FAQ {
  question: string
  answer: string
}

const CourseUpdateView = ({ slug }: { slug: string }) => {
  // const [image, setImage] = useState<string | ArrayBuffer | null>(null)
  // const [video, setVideo] = useState<string | ArrayBuffer | null>(null)
  const [benefits, setBenefits] = useState<string[]>(['', '', '', ''])
  const [requirements, setRequirements] = useState(['', '', '', ''])
  const [faqs, setFaqs] = useImmer<FAQ[]>([
    { question: 'Ví dụ câu hỏi?', answer: 'Ví dụ câu trả lời' },
  ])
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const avatarCourseRef = useRef<HTMLInputElement | null>(null)
  const trailerCourseRef = useRef<HTMLInputElement | null>(null)

  const { data: courseOverviewData, isLoading: isCourseOverviewLoading } =
    useGetCourseOverview(slug)
  const { data: categoryData } = useGetCategories()

  const form = useForm<UpdateCoursePayload>({
    resolver: zodResolver(updateCourseSchema),
    defaultValues: {
      name: '',
      category_id: undefined,
      price: 0,
      price_sale: 0,
      level: 'beginner',
      benefits: [''],
      requirements: [''],
      faqs: [{ question: '', answer: '' }],
    },
  })

  useEffect(() => {
    if (courseOverviewData) {
      form.reset({
        name: courseOverviewData.name || '',
        category_id: courseOverviewData.category_id || '',
        price: courseOverviewData.price || 0,
        price_sale: courseOverviewData.price_sale || 0,
        level: courseOverviewData.level || '',
      })
    }
  }, [courseOverviewData, form])

  // const handleImageChange = (e: any) => {
  //   const file = e.target.files[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onloadend = () => {
  //       setImage(reader?.result)
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }
  //
  // const handleResetImage = () => {
  //   setImage('')
  //   if (avatarCourseRef.current) {
  //     avatarCourseRef.current.value = ''
  //   }
  // }
  //
  // const handleVideoChange = (e: any) => {
  //   const file = e.target.files[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onloadend = () => {
  //       setVideo(reader.result)
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }
  //
  // const handleResetTrailer = () => {
  //   setVideo('')
  //   if (trailerCourseRef.current) {
  //     trailerCourseRef.current.value = ''
  //   }
  // }

  const handleAddBenefit = () => {
    if (benefits.length < 10) {
      setBenefits([...benefits, ''])
    }
  }

  const handleAddRequirement = () => {
    if (requirements.length < 10) {
      setRequirements([...requirements, ''])
    }
  }

  const handleAddQA = () => {
    if (faqs.length < 10) {
      setFaqs((draft) => {
        draft.push({ question, answer })
      })
      setQuestion('')
      setAnswer('')
    }
  }

  const handleInputChange = (index: number, value: string) => {
    const newBenefits = [...benefits]
    newBenefits[index] = value
    setBenefits(newBenefits)

    if (
      index === benefits.length - 1 &&
      value.trim() !== '' &&
      benefits.length < 10
    ) {
      handleAddBenefit()
    }
  }

  const handleInputChangeRequirement = (index: number, value: string) => {
    const newRequirements = [...requirements]
    newRequirements[index] = value
    setRequirements(newRequirements)

    if (
      index === requirements.length - 1 &&
      value.trim() !== '' &&
      requirements.length < 10
    ) {
      handleAddRequirement()
    }
  }

  const handleRemoveBenefit = (index: number) => {
    const newBenefits = benefits.filter((_, i) => i !== index)
    setBenefits(newBenefits)
  }

  const handleRemoveRequirement = (index: number) => {
    const newRequirements = requirements.filter((_, i) => i !== index)
    setRequirements(newRequirements)
  }

  const handleRemoveQA = (index: number) => {
    setFaqs((draft) => {
      draft.splice(index, 1)
    })
  }

  const isLoading = isCourseOverviewLoading

  if (isLoading) {
    return (
      <div className="mt-20">
        <Loader2 className="mx-auto size-8 animate-spin" />
      </div>
    )
  }

  const onSubmit = (data: UpdateCoursePayload) => {
    console.log(data)
  }

  return (
    <div className="px-5 py-6">
      <div className="mt-2">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">
            Cập nhật nội dung khoá học: {courseOverviewData?.name}
          </h3>
          <Button className="bg-primary">Gửi yêu cầu duyệt khoá học</Button>
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
                          <Button type="submit" className="ms-2 bg-primary">
                            Lưu thông tin
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <h3 className="text-base font-semibold">
                          Lợi ích mà khoá học mang lại?
                        </h3>
                        <p className="text-[14px] text-[#4b5563]">
                          Bạn phải nhập ít nhất 4 lợi ích mà Học viên có thể
                          nhận được sau khi kết thúc khoá học.
                        </p>
                        <div>
                          {benefits.map((benefit, index) => (
                            <div key={index} className="relative mt-3">
                              <Input
                                placeholder={`Nhập lợi ích số ${index + 1}`}
                                className="h-[40px] pr-10"
                                value={benefit}
                                onChange={(e) =>
                                  handleInputChange(index, e.target.value)
                                }
                              />
                              {index >= 4 && (
                                <button
                                  className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500"
                                  onClick={() => handleRemoveBenefit(index)}
                                >
                                  <Trash size={16} />
                                </button>
                              )}
                            </div>
                          ))}
                          <div className="mt-3">
                            <Button
                              disabled={benefits.length >= 10}
                              onClick={handleAddBenefit}
                            >
                              <CirclePlus size={18} />
                              Thêm lợi ích vào khoá học của bạn
                            </Button>
                            {benefits.length >= 10 && (
                              <p className="mt-2 text-sm text-red-500">
                                Bạn đã đạt tối đa 10 lợi ích.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-base font-semibold">
                          Yêu cầu khi tham gia khoá học?
                        </h3>
                        <p className="text-[14px] text-[#4b5563]">
                          Liệt kê các kỹ năng, kinh nghiệm, công cụ hoặc thiết
                          bị mà học viên bắt buộc phải có trước khi tham gia
                          khóa học.
                        </p>
                        <div>
                          {requirements.map((requirement, index) => (
                            <div key={index} className="relative mt-3">
                              <Input
                                placeholder={`Nhập yêu cầu số ${index + 1}`}
                                className="h-[40px] pr-10"
                                value={requirement}
                                onChange={(e) =>
                                  handleInputChangeRequirement(
                                    index,
                                    e.target.value
                                  )
                                }
                              />
                              {index >= 4 && (
                                <button
                                  className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500"
                                  onClick={() => handleRemoveRequirement(index)}
                                >
                                  <Trash size={16} />
                                </button>
                              )}
                            </div>
                          ))}
                          <div className="mt-3">
                            <Button
                              onClick={handleAddRequirement}
                              disabled={requirements.length >= 10}
                            >
                              <CirclePlus size={18} />
                              Thêm yêu cầu khi tham gia khoá học
                            </Button>
                            {requirements.length >= 10 && (
                              <p className="mt-2 text-sm text-red-500">
                                Bạn đã đạt tối đa 10 yêu cầu.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-base font-semibold">
                          Câu hỏi và câu trả lời
                        </h3>
                        <p className="text-[14px] text-[#4b5563]">
                          Bạn phải nhập ít nhất 1 câu hỏi và câu trả lời, tối đa
                          10 cặp FAQ.
                        </p>
                        <div>
                          {faqs.map((qa, index) => (
                            <div
                              key={index}
                              className="relative mt-3 flex gap-2"
                            >
                              <Input
                                placeholder={`Nhập câu hỏi số ${index + 1}`}
                                className="h-[40px] pr-10"
                                defaultValue={qa.question}
                              />
                              <Input
                                placeholder={`Nhập câu trả lời số ${index + 1}`}
                                className="h-[40px] pr-10"
                                defaultValue={qa.answer}
                              />
                              {index >= 1 && (
                                <button
                                  className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500"
                                  onClick={() => handleRemoveQA(index)}
                                >
                                  <Trash size={16} />
                                </button>
                              )}
                            </div>
                          ))}
                          <div className="mt-3">
                            <Button
                              disabled={faqs.length >= 10}
                              onClick={handleAddQA}
                            >
                              <CirclePlus size={18} />
                              Thêm câu hỏi và câu trả lời
                            </Button>
                            {faqs.length >= 10 && (
                              <p className="mt-2 text-sm text-red-500">
                                Bạn đã đạt tối đa 10 câu hỏi.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
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
                          <Button className="ms-2 bg-primary">
                            Lưu thông tin
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
                                    type="number"
                                    placeholder="Nhập giá khoá học"
                                    {...field}
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
                                    type="number"
                                    placeholder="Giá khuyến mãi"
                                    {...field}
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
                                            ? (categoryData?.find(
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
                                            {categoryData?.map(
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
                                      value={field.value}
                                      onValueChange={field.onChange}
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
                              name="status"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Select
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
                      <div className="mt-3">
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
                                      ? `url(${field.value})`
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
                                    onClick={() => field.onChange(null)}
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
                                        if (e.target.files) {
                                          field.onChange(
                                            URL.createObjectURL(
                                              e.target.files[0]
                                            )
                                          )
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
                      <div className="mt-3">
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
                                        typeof field.value === 'string'
                                          ? field.value
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
                                    onClick={() => field.onChange(null)}
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
                                        if (e.target.files) {
                                          field.onChange(
                                            URL.createObjectURL(
                                              e.target.files[0]
                                            )
                                          )
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
                    </CardContent>
                  </Card>
                </TabsContent>
              </form>
            </Form>
            <TabsContent value="courseChapter" className="m-0">
              <CourseChapterTab
                slug={slug}
                chapters={courseOverviewData?.chapters}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default CourseUpdateView
