import React, { useEffect, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronDown, Loader2, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'

import { ICategory } from '@/types/Category'
import {
  UpdateCourseOverViewPayload,
  updateCourseOverViewSchema,
} from '@/validations/course'
import { formatNumber } from '@/lib/common'
import { cn } from '@/lib/utils'
import { useGetCategories } from '@/hooks/category/useCategory'
import { useUpdateCourseOverView } from '@/hooks/instructor/course/useCourse'

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ModalLoading from '@/components/common/ModalLoading'

const CourseOverView = ({ courseOverView }: any) => {
  const avatarCourseRef = useRef<HTMLInputElement | null>(null)
  const trailerCourseRef = useRef<HTMLInputElement | null>(null)

  const { data: categoryData } = useGetCategories()
  const {
    mutate: updateCourseOverView,
    isPending: updateCourseOverViewPending,
  } = useUpdateCourseOverView()

  const form = useForm<UpdateCourseOverViewPayload>({
    resolver: zodResolver(updateCourseOverViewSchema),
    defaultValues: {
      name: '',
      category_id: undefined,
      price: 0,
      price_sale: 0,
      description: '',
      level: '' as 'beginner' | 'intermediate' | 'advanced',
      visibility: '' as 'public' | 'private',
      is_free: '0' as '0' | '1',
    },
  })

  const isReadOnly = !(
    courseOverView?.status === 'draft' || courseOverView?.status === 'rejected'
  )

  useEffect(() => {
    if (courseOverView) {
      const data = courseOverView

      form.reset({
        name: data.name || '',
        category_id: data.category_id || '',
        price: parseFloat(data.price) || 0,
        price_sale: parseFloat(data.price_sale) || 0,
        level: data.level || '',
        description: data.description || '',
        visibility: data.visibility || '',
        is_free: data.is_free || '0',
        thumbnail: data.thumbnail || '',
        intro: data.intro || '',
      })
    }
  }, [courseOverView, form])

  const onSubmit = (data: UpdateCourseOverViewPayload) => {
    updateCourseOverView({ slug: courseOverView.slug, data })
  }

  if (updateCourseOverViewPending) {
    return <ModalLoading />
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Thông tin khoá học</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Thông tin sẽ được hiển thị trên trang Tổng quan, dễ dàng tiếp
                cận Học viên hơn.
              </p>
            </div>
            {(courseOverView?.status === 'draft' ||
              courseOverView?.status === 'rejected') && (
              <div>
                <Button variant="destructive">Nhập lại</Button>
                <Button
                  type="submit"
                  className="ms-2 bg-primary"
                  disabled={updateCourseOverViewPending}
                >
                  {updateCourseOverViewPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Lưu thông tin'
                  )}
                </Button>
              </div>
            )}
          </div>
          <div className="mt-4">
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
                        readOnly={isReadOnly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="mt-2 text-[14px] text-[#4b5563]">
                Tiêu đề của bạn không những phải thu hút sự chú ý, chứa nhiều
                thông tin mà còn được tối ưu hóa để dễ tìm kiếm
              </p>
            </div>
            <div className="mt-3">
              <Label className="text-base font-semibold">Mô tả khoá học</Label>
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
                        readOnly={isReadOnly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-3">
              <Label className="text-base font-semibold">Giá khoá học</Label>
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
                            const rawValue = e.target.value.replace(/\D/g, '')
                            field.onChange(
                              rawValue ? parseInt(rawValue, 10) : 0
                            )
                          }}
                          readOnly={isReadOnly}
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
                            const rawValue = e.target.value.replace(/\D/g, '')
                            field.onChange(
                              rawValue ? parseInt(rawValue, 10) : 0
                            )
                          }}
                          readOnly={isReadOnly}
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
                                  !field.value && 'text-muted-foreground'
                                )}
                                disabled={isReadOnly}
                              >
                                {field.value
                                  ? (categoryData?.data.find(
                                      (category: ICategory) =>
                                        category.id === field.value
                                    )?.name ?? 'Chọn danh mục cho khóa học')
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
                                        disabled={isReadOnly}
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
                            disabled={isReadOnly}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn cấp độ" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Cơ bản</SelectItem>
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
                            disabled={isReadOnly}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Trạng thái khoá học" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Công khai</SelectItem>
                              <SelectItem value="private">Riêng tư</SelectItem>
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
              <div>
                <Label className="text-base font-semibold">Ảnh đại diện</Label>
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-2 gap-4">
                      <div className="relative mt-3">
                        <div
                          className="flex h-[200px] w-full items-center justify-center rounded-lg bg-primary"
                          style={{
                            backgroundImage: field.value
                              ? field.value instanceof File
                                ? `url(${URL.createObjectURL(field.value)})`
                                : `url(${field.value})`
                              : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                          onClick={() => avatarCourseRef.current?.click()}
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
                            disabled={isReadOnly}
                            className="absolute right-0 top-0 p-2 text-white opacity-80 transition-opacity duration-200 ease-in-out hover:opacity-100"
                          >
                            <Trash2 />
                          </button>
                        )}
                        <div className="hidden">
                          <p>Tải hình ảnh khoá học lên tại đây</p>
                          <div className="mt-3">
                            <Input
                              disabled={isReadOnly}
                              ref={avatarCourseRef}
                              id="thumbnail"
                              type="file"
                              onChange={(e) => {
                                if (e.target.files?.length) {
                                  const file = e.target.files[0]
                                  field.onChange(file)
                                }
                              }}
                              accept="image/png, image/jpeg, image/jpg, img/webp"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <p>Tải hình ảnh khoá học lên tại đây</p>
                        <p className="my-2 text-sm text-muted-foreground">
                          Tải lên hình ảnh khóa học của bạn ở đây. Nó phải đáp
                          ứng khóa học của chúng tôi tiêu chuẩn chất lượng hình
                          ảnh được chấp nhận. .jpg, .jpeg,. gif, or .png. no
                          text on the image.
                        </p>
                        <div className="mt-3 cursor-pointer">
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
                            disabled={isReadOnly}
                            accept="image/png, image/jpeg, image/jpg"
                          />
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
                    <FormItem className="grid grid-cols-2 gap-4">
                      <div className="relative mt-3">
                        <div className="flex h-[200px] w-full items-center justify-center rounded-lg bg-primary">
                          {field.value ? (
                            <video
                              className="size-full rounded-lg object-cover"
                              controls
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                            />
                          ) : (
                            <p
                              className="cursor-pointer text-white"
                              onClick={() => trailerCourseRef.current?.click()}
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
                            disabled={isReadOnly}
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
                              disabled={isReadOnly}
                              accept="video/mp4, video/webm, video/ogg"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <p>Tải video khoá học lên tại đây</p>
                        <p className="my-2 text-sm text-muted-foreground">
                          Video quảng cáo của bạn là cách nhanh chóng và hấp dẫn
                          để học viên xem trước những gì họ sẽ học trong khóa
                          học của bạn. Những sinh viên đang xem xét khóa học của
                          bạn có nhiều khả năng đăng ký hơn nếu video quảng cáo
                          của bạn được thực hiện tốt.
                        </p>
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
                            disabled={isReadOnly}
                            accept="video/mp4, video/webm, video/ogg"
                          />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="mt-3">
              <Label className="text-base font-semibold">Miễn phí</Label>
              <FormField
                control={form.control}
                name="is_free"
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <FormControl>
                      <Select
                        key={field.value}
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={String(field.value)}
                        disabled={isReadOnly}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Miễn phí hay không?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={String(1)}>Miễn phí</SelectItem>
                          <SelectItem value={String(0)}>Có phí</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}

export default CourseOverView
