import React, { useCallback, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { LessonVideoPayload, lessonVideoSchema } from '@/validations/lesson'
import QUERY_KEY from '@/constants/query-key'
import { useCreateLessonVideo } from '@/hooks/instructor/lesson/useLesson'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import TinyEditor from '@/components/shared/tiny-editor'

type Props = {
  chapterId?: string
  onHide: () => void
}

const LessonVideo = ({ onHide, chapterId }: Props) => {
  const queryClient = useQueryClient()

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [content, setContent] = useState<string>('')

  const { mutate: createLessonVideo, isPending: isLessonVideoCreating } =
    useCreateLessonVideo()

  const form = useForm<LessonVideoPayload>({
    resolver: zodResolver(lessonVideoSchema),
    defaultValues: {
      title: '',
      content: '',
      is_free_preview: false,
      video_file: null as any,
    },
  })

  const handleClose = () => {
    onHide()
  }

  const handleFileChange = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const validTypes = ['video/mp4', 'video/avi', 'video/x-mkv']
      if (!validTypes.includes(file.type)) {
        alert('Invalid file type.')
        return
      }
      form.setValue('video_file', file)
      setSelectedFile(file)
      const videoUrl = URL.createObjectURL(file)
      setVideoUrl(videoUrl)
    }
  }

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleResetClick = useCallback(() => {
    setSelectedFile(null)
    setVideoUrl('')
    form.setValue('video_file', null as unknown as File)
  }, [form])

  const onsubmit = (data: LessonVideoPayload) => {
    if (!selectedFile || !chapterId) return
    if (isLessonVideoCreating) return

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)
    if (data.is_free_preview) {
      formData.append('is_free_preview', '1')
    } else {
      formData.append('is_free_preview', '0')
    }
    formData.append('video_file', selectedFile)
    formData.append('chapter_id', String(chapterId))

    createLessonVideo(
      { chapterId, payload: formData },
      {
        onSuccess: async (res: any) => {
          await queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
          })
          form.reset()
          onHide()

          toast.success(res.message)
        },
        onError: async (error: any) => {
          toast.error(error.message || 'Có lỗi xảy ra')
        },
      }
    )
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="font-semibold">Thêm bài giảng</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)}>
          <div>
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
                      value={content}
                      onEditorChange={(value: string) => {
                        setContent(value)
                        form.setValue('content', value)
                      }}
                      minimalist
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-2">
            <h3 className="my-2 text-sm">Tải video cho bài giảng</h3>
            {selectedFile ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-gray-300 p-5">
                <video
                  src={videoUrl}
                  controls
                  loop
                  className="size-full rounded-lg object-cover"
                />
                <div className="mt-2 flex w-full items-center justify-between">
                  <p className="text-left text-sm font-medium">
                    Đã chọn video: {selectedFile?.name || ''}
                  </p>
                  <button
                    onClick={handleResetClick}
                    type="button"
                    className="rounded-lg border bg-red-500 px-6 py-2 font-medium text-white hover:bg-red-600"
                  >
                    Tải lại
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-gray-300 p-5">
                <span className="text-xs">
                  Tải dữ liệu video hoặc kéo thả vào đây
                </span>
                <button
                  type="button"
                  className="rounded-lg border border-black p-4 font-medium transition-all duration-300 ease-in-out hover:bg-[#404040] hover:text-white"
                  onClick={handleUploadClick}
                >
                  Upload a video
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".mp4,.avi,.mkv,.flv"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
          <div>
            <h3 className="mt-2 text-sm">
              Cho phép học viên xem trước nội dung
            </h3>
            <div className="mt-2">
              <FormField
                control={form.control}
                name="is_free_preview"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Cho phép xem trước</FormLabel>
                      <FormDescription>
                        Học viên có thể xem trước nội dung bài học
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end">
            <Button onClick={handleClose} className="mr-3" variant="secondary">
              Huỷ
            </Button>
            <Button type="submit" disabled={isLessonVideoCreating}>
              {isLessonVideoCreating && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}
              Thêm bài học
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default LessonVideo
