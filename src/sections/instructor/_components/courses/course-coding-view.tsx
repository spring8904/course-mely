'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { MoveLeft } from 'lucide-react'
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

  const form = useForm<UpdateCodingLessonPayload>({
    resolver: zodResolver(updateCodingLessonSchema),
  })

  const updateCodingLesson = useUpdateCodingLesson()

  const onSubmit = (values: UpdateCodingLessonPayload) => {
    console.log(values)
  }

  useEffect(() => {
    if (lessonCoding?.data) {
      form.reset(lessonCoding.data)
    }
  }, [form, lessonCoding])

  const handleBack = () => {
    router.back()
  }

  const handleUpdateLanguage = (language: string) => {
    updateCodingLesson.mutate({
      chapterSlug: slug,
      codingId: codingId,
      data: {
        language,
        title: lessonCoding?.data.title,
        result_code: lessonCoding?.data.result_code,
        solution_code: lessonCoding?.data.solution_code,
      },
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
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
            <Button disabled={updateCodingLesson.isPending} type="submit">
              Lưu
            </Button>
          </header>

          <Tabs defaultValue="plan" className="h-screen py-[68px] [&>*]:mt-0">
            <TabsContent value="plan">
              <main className="flex flex-col p-4">
                <div className="container mx-auto max-w-4xl space-y-4 p-4">
                  <h2 className="text-2xl font-bold">Bài tập Coding</h2>
                  <p>
                    Bài tập mã hóa cho phép người học thực hành một phần công
                    việc thực tế có mục tiêu và nhận được phản hồi ngay lập tức.
                    Chúng tôi khuyên bạn nên làm theo các bước sau: Lên kế hoạch
                    cho bài tập, xác định giải pháp và hướng dẫn người học. Điều
                    này sẽ đảm bảo bạn định hình được vấn đề và cung cấp hướng
                    dẫn cần thiết với giải pháp trong đầu.
                  </p>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tiêu đề bài tập</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập tiêu đề bài tập"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="language"
                    render={() => (
                      <FormItem>
                        <FormLabel>Chọn ngôn ngữ</FormLabel>
                        <Select
                          onValueChange={handleUpdateLanguage}
                          defaultValue={lessonCoding?.data.language}
                          disabled={updateCodingLesson.isPending}
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
              </main>
            </TabsContent>
            <TabsContent value="solution" className="h-full">
              <SolutionTab form={form} />
            </TabsContent>
            <TabsContent value="guide">
              {/* <TinyEditor
                value={content}
                onEditorChange={(value: any) => {
                  setContent(value)
                  console.log(value)
                }}
              /> */}
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
