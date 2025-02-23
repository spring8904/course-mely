'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, MoveLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'

import {
  UpdateCodingLessonPayload,
  updateCodingLessonSchema,
} from '@/validations/course'
import { LANGUAGE_CONFIG } from '@/constants/language'
import {
  useGetLessonCoding,
  useUpdateCodingLesson,
} from '@/hooks/instructor/lesson/useLesson'

import { Button } from '@/components/ui/button'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ModalLoading from '@/components/common/ModalLoading'

import GuideTab from './guide-tab'
import SolutionTab from './solution-tab'

const CourseCodingView = ({
  slug,
  codingId,
}: {
  slug: string
  codingId: string
}) => {
  const router = useRouter()
  const { data: lessonCoding, isLoading } = useGetLessonCoding(slug, codingId)
  const updateCodingLesson = useUpdateCodingLesson()

  const disabled = updateCodingLesson.isPending

  const form = useForm<UpdateCodingLessonPayload>({
    resolver: zodResolver(updateCodingLessonSchema),
    defaultValues: {
      title: '',
      language: '',
      sample_code: '',
      result_code: '',
      solution_code: '',
      hints: [],
      instruct: '',
      content: '',
    },
    values: lessonCoding?.data,
  })

  const onSubmit = (values: UpdateCodingLessonPayload) => {
    updateCodingLesson.mutate({
      chapterSlug: slug,
      codingId: codingId,
      data: values,
    })
  }

  const handleBack = () => {
    router.back()
  }

  if (isLoading) {
    return <ModalLoading />
  }

  return (
    <div className="relative min-h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <header className="fixed inset-x-0 top-0 z-10 flex justify-between bg-white p-4 shadow-md">
            <div className="flex items-center gap-4">
              <MoveLeft
                className="cursor-pointer"
                onClick={handleBack}
                size={18}
              />
              <span>Quay lại chương trình giảng dạy</span>
              <span className="text-xl font-bold">
                {lessonCoding?.data.title || 'Bài tập Coding'}
              </span>
            </div>
            <Button type="submit" disabled={disabled}>
              {updateCodingLesson.isPending && (
                <Loader2 className="animate-spin" />
              )}{' '}
              Cập nhật
            </Button>
          </header>

          <Tabs defaultValue="plan" className="h-screen py-[68px] [&>*]:mt-0">
            <TabsContent value="plan" className="h-full">
              <div className="container mx-auto max-w-4xl space-y-4 p-8">
                <h2 className="text-2xl font-bold">Bài tập Coding</h2>
                <p className="text-muted-foreground">
                  Bài tập mã hóa cho phép người học thực hành một phần công việc
                  thực tế có mục tiêu và nhận được phản hồi ngay lập tức. Chúng
                  tôi khuyên bạn nên làm theo các bước sau: Lên kế hoạch cho bài
                  tập, xác định giải pháp và hướng dẫn người học. Điều này sẽ
                  đảm bảo bạn định hình được vấn đề và cung cấp hướng dẫn cần
                  thiết với giải pháp trong đầu.
                </p>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiêu đề bài tập</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tiêu đề bài tập" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chọn ngôn ngữ</FormLabel>
                      <Select
                        key={field.value}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn ngôn ngữ" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(LANGUAGE_CONFIG).map(
                            ([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value.displayName}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
            <TabsContent value="solution" className="h-full">
              <SolutionTab />
            </TabsContent>
            <TabsContent value="guide" className="h-full">
              <GuideTab />
            </TabsContent>
            <footer className="fixed inset-x-0 bottom-0 z-10 flex justify-center border-t bg-white p-4">
              <TabsList className="flex gap-4">
                <TabsTrigger value="plan">Kế hoạch tập luyện</TabsTrigger>
                <TabsTrigger value="solution">Giải pháp</TabsTrigger>
                <TabsTrigger value="guide">Hướng dẫn</TabsTrigger>
              </TabsList>
            </footer>
          </Tabs>
        </form>
      </Form>
    </div>
  )
}

export default CourseCodingView
