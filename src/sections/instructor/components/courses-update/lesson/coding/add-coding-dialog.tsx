import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { LessonCodingPayload, lessonCodingSchema } from '@/validations/lesson'
import { LANGUAGE_CONFIG } from '@/constants/language'
import QUERY_KEY from '@/constants/query-key'
import { useCreateLessonCoding } from '@/hooks/instructor/lesson/useLesson'

import { Button } from '@/components/ui/button'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import TinyEditor from '@/components/shared/tiny-editor'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  chapterId?: string
}

const AddCodingDialog = ({ chapterId, open, onOpenChange }: Props) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: createLessonCoding, isPending: isLessonCodingCreatePending } =
    useCreateLessonCoding()

  const form = useForm<LessonCodingPayload>({
    resolver: zodResolver(lessonCodingSchema),
    defaultValues: {
      title: '',
      content: '',
      language: undefined,
    },
  })

  const onSubmit = (data: LessonCodingPayload) => {
    createLessonCoding(
      {
        chapterId: chapterId as string,
        payload: data,
      },
      {
        onSuccess: async (res: any) => {
          form.reset()
          toast.success(res.message)
          onOpenChange(false)
          router.push(
            `/course/${res?.data.slug}/coding-exercise?coding=${res?.data.lessonable_id}`
          )

          await queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
          })
        },
        onError: (error: any) => {
          toast.error(error.message || 'Có lỗi xảy ra')
        },
      }
    )
  }

  return (
    <Dialog open={open}>
      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>Bài tập Coding</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Bạn có thể tạo bài tập lập trình tại đây.
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="my-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề bài giảng</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tiêu đề bài giảng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="my-2">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nội dung bài giảng</FormLabel>
                    <FormControl>
                      <TinyEditor
                        value={field.value}
                        onEditorChange={field.onChange}
                        minimalist
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chọn ngôn ngữ lập trình</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn ngôn ngữ lập trình" />
                        </SelectTrigger>
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4 flex items-center justify-end">
              <Button
                onClick={() => onOpenChange(false)}
                className="mr-3"
                variant="secondary"
              >
                Huỷ
              </Button>
              <Button type="submit" disabled={isLessonCodingCreatePending}>
                {isLessonCodingCreatePending && (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                )}
                Thêm bài học
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCodingDialog
