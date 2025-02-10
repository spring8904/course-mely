import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { LessonType } from '@/types'
import { CreateLessonPayload, createLessonSchema } from '@/validations/lesson'
import { useCreateLesson } from '@/hooks/instructors/lessons/useLesson'

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

type Props = {
  chapterId: number
  type: LessonType
  onHide: () => void
}

const CreateLesson = ({ chapterId, onHide, type }: Props) => {
  const { mutate: createLesson, isPending: isLessonCreating } =
    useCreateLesson()

  const form = useForm<CreateLessonPayload>({
    resolver: zodResolver(createLessonSchema),
    defaultValues: {
      chapter_id: chapterId,
      type,
      title: '',
    },
  })

  const onSubmit = (values: CreateLessonPayload) => {
    if (isLessonCreating) return

    createLesson(values, {
      onSuccess: onHide,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mt-4 flex h-full flex-col justify-between rounded-lg border p-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bài học mới:</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tiêu đề" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4 flex items-center justify-end">
            <Button onClick={onHide} className="mr-3" variant="secondary">
              Huỷ
            </Button>
            <Button type="submit" disabled={isLessonCreating}>
              {isLessonCreating ? <Loader2 className="animate-spin" /> : 'Thêm'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
export default CreateLesson
