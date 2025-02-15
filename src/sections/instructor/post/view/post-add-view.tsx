'use client'

import React, { useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronDown, Loader2 } from 'lucide-react'
import DatePicker from 'react-datepicker'
import { useForm } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'

import { ICategory } from '@/types/Category'
import { CreatePostPayload, createPostSchema } from '@/validations/post'
import { cn } from '@/lib/utils'
import { useGetCategories } from '@/hooks/category/useCategory'

import { Button } from '@/components/ui/button'

import 'react-datepicker/dist/react-datepicker.css'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { parseISO } from 'date-fns'

import { useCreatePost } from '@/hooks/instructor/post/usePost'

import { Card, CardContent } from '@/components/ui/card'
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
import TinyEditor from '@/components/shared/tiny-editor'

const PostAddView = () => {
  const router = useRouter()

  const { data: categoryData } = useGetCategories()
  const { mutate: createPost, isPending } = useCreatePost()

  const [description, setDescription] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<CreatePostPayload>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
    },
  })

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      field.onChange(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleReset = (field?: { onChange?: (value: any) => void }) => {
    setPreview(null)

    if (field?.onChange) {
      field.onChange(null)
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const onSubmit = (values: CreatePostPayload) => {
    if (isPending) return

    createPost(
      {
        ...values,
        description,
        content,
        thumbnail: form.getValues('thumbnail'),
      },
      {
        onSuccess: () => {
          form.reset()
          setPreview(null)
          router.push('/instructor/posts')
        },
      }
    )
  }

  return (
    <div className="px-5 py-6">
      <div className="mt-2">
        <p className="text-xl font-bold">Thêm bài viết</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-4 grid grid-cols-[1fr,300px] gap-6">
            <div className="space-y-6">
              <Card>
                <CardContent className="space-y-4 p-6">
                  <div>
                    <h2 className="mb-2 text-lg font-medium">
                      Thông tin bài viết
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tiêu đề bài viết</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nhập tiêu đề bài viết"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <Label>Hình ảnh</Label>
                        <div className="mt-1">
                          <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    className="cursor-pointer"
                                    onChange={(event) =>
                                      handleFileChange(event, field)
                                    }
                                    ref={fileInputRef}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        {preview && (
                          <>
                            <div className="mt-2">
                              <Image
                                src={preview}
                                alt="Preview"
                                width={300}
                                height={300}
                                className="h-[300px] w-full rounded-md object-cover"
                              />
                            </div>
                            <div className="mt-2 text-end">
                              <Button
                                type="button"
                                onClick={() =>
                                  handleReset(form.setValue as any)
                                }
                              >
                                Reset
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                      <div>
                        <Label>Mô tả bài viết</Label>
                        <div className="mt-1">
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <TinyEditor
                                    {...field}
                                    value={content}
                                    onEditorChange={(value: any) => {
                                      setContent(value)
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Nội dung</Label>
                        <div className="mt-1">
                          <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <TinyEditor
                                    {...field}
                                    value={description}
                                    onEditorChange={(value: any) => {
                                      setDescription(value)
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h2 className="mb-2 text-lg font-medium">Tuỳ chỉnh</h2>
                  <div className="mb-2 border-t"></div>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="published_at"
                      render={({ field }) => {
                        let selectedDate: Date | null = null

                        const fieldValue = field.value as any

                        if (typeof fieldValue === 'string') {
                          selectedDate = parseISO(fieldValue)
                        } else if (fieldValue instanceof Date) {
                          selectedDate = fieldValue
                        } else {
                          selectedDate = new Date()
                        }

                        return (
                          <FormItem>
                            <Label>Ngày xuất bản</Label>
                            <FormControl>
                              <DatePicker
                                selected={selectedDate}
                                onChange={(date) => field.onChange(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="dd/MM/yyyy HH:mm"
                                placeholderText="Chọn ngày giờ"
                                className="w-[240px] rounded-md border p-2"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
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
                                  {categoryData?.data.map(
                                    (category: ICategory) => (
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
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h2 className="mb-2 text-lg font-medium">Tags</h2>
                  <div className="mb-3 border-t"></div>
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CreatableSelect
                            isMulti
                            placeholder="Nhập tags và nhấn Enter..."
                            value={field.value?.map((tag: string) => ({
                              value: tag,
                              label: tag,
                            }))}
                            onChange={(selected) =>
                              field.onChange(
                                selected.map((option) => option.value)
                              )
                            }
                            onCreateOption={(inputValue) => {
                              field.onChange([
                                ...(field.value || []),
                                inputValue,
                              ])
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    'Xuất bản'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default PostAddView
