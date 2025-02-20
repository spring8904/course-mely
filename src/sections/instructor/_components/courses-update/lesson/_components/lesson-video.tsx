import React, { useCallback, useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { LessonVideoPayload, lessonVideoSchema } from '@/validations/lesson'
import {
  useCreateLessonVideo,
  useGetLessonVideo,
  useUpdateLessonVideo,
} from '@/hooks/instructor/lesson/useLesson'

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
import ModalLoading from '@/components/common/ModalLoading'
import TinyEditor from '@/components/shared/tiny-editor'
import DialogVideoPreview from '@/sections/instructor/_components/courses-update/lesson/_components/video/dialog-video-preview'

type Props = {
  chapterId?: string
  onHide: () => void
  courseStatus?: string
  isEdit?: boolean
  lessonId?: string | number
}

const LessonVideo = ({
  onHide,
  chapterId,
  courseStatus,
  isEdit,
  lessonId,
}: Props) => {
  const [isOpenVideoPreview, setIsOpenVideoPreview] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [muxPlaybackId, setMuxPlaybackId] = useState<string | null>(null)

  const { data: lessonVideoData } = useGetLessonVideo(
    chapterId as string,
    (lessonId as string) || ''
  )
  const { mutate: createLessonVideo, isPending: isLessonVideoCreating } =
    useCreateLessonVideo()
  const { mutate: updateLessonVideo, isPending: isLessonVideoUpdating } =
    useUpdateLessonVideo()

  const form = useForm<LessonVideoPayload>({
    resolver: zodResolver(lessonVideoSchema),
    defaultValues:
      isEdit && lessonVideoData?.data
        ? {
            title: lessonVideoData.data.title,
            content: lessonVideoData.data.content,
            is_free_preview: Boolean(lessonVideoData.data.is_free_preview),
            video_file: null as any,
            isEdit: true,
          }
        : {
            title: '',
            content: '',
            is_free_preview: false,
            video_file: null as any,
            isEdit: false,
          },
  })

  useEffect(() => {
    if (isEdit && lessonVideoData?.data) {
      const { title, content, is_free_preview, lessonable } =
        lessonVideoData.data

      form.reset({
        title,
        content,
        is_free_preview: is_free_preview || false,
        video_file: null as any,
      })

      form.setValue('isEdit', true)

      if (lessonable?.mux_playback_id) {
        setMuxPlaybackId(lessonable.mux_playback_id)
      }
    }
  }, [isEdit, lessonVideoData, form.reset])

  const handleClose = () => {
    onHide()
  }

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const validTypes = ['video/mp4', 'video/avi', 'video/x-mkv']
    if (!validTypes.includes(file.type)) {
      form.setError('video_file', {
        message: 'Định dạng file không hợp lệ. Chỉ chấp nhận MP4, AVI, MKV.',
      })
      return
    }

    form.clearErrors('video_file')
    form.setValue('video_file', file)
    setSelectedFile(file)

    const videoUrl = URL.createObjectURL(file)
    setVideoUrl(videoUrl)
  }

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleResetClick = useCallback(() => {
    setSelectedFile(null)
    setVideoUrl('')
    form.setValue('video_file', null as unknown as File)
    form.clearErrors('video_file')
  }, [form])

  const onsubmit = (data: LessonVideoPayload) => {
    if ((!isEdit && !selectedFile) || !chapterId) return

    if (isLessonVideoCreating || isLessonVideoUpdating) return

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)
    if (data.is_free_preview !== undefined) {
      formData.append('is_free_preview', data.is_free_preview ? '1' : '0')
    }
    if (isEdit) {
      if (selectedFile) {
        formData.append('video_file', selectedFile)
      } else {
        formData.delete('video_file')
      }
    } else {
      if (!selectedFile) {
        return toast.error('Vui lòng tải lên video')
      }
      formData.append('video_file', selectedFile)
    }
    formData.append('chapter_id', String(chapterId))
    if (isEdit) {
      formData.append('_method', 'PUT')
    }

    if (isEdit) {
      updateLessonVideo(
        { chapterId, lessonId: String(lessonId), payload: formData },
        {
          onSuccess: async (res: any) => {
            form.reset()
            onHide()

            toast.success(res.message)
          },
          onError: async (error: any) => {
            toast.error(error.message || 'Có lỗi xảy ra')
          },
        }
      )
    } else {
      createLessonVideo(
        { chapterId, payload: formData },
        {
          onSuccess: async (res: any) => {
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
  }

  if (isLessonVideoUpdating || isLessonVideoCreating) {
    return <ModalLoading />
  }

  return (
    <>
      <div className="mb-4 flex justify-between">
        <h2 className="font-semibold">
          {courseStatus === 'draft' || courseStatus === 'reject'
            ? isEdit
              ? 'Cập nhật'
              : 'Thêm'
            : 'Thông tin'}{' '}
          bài giảng
        </h2>
        {muxPlaybackId && (
          <Button onClick={() => setIsOpenVideoPreview(true)}>Video</Button>
        )}
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
          <div className="mt-2">
            <FormField
              control={form.control}
              name="video_file"
              render={({ field }) => (
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
                          onClick={() => {
                            handleResetClick()
                            field.onChange(undefined) // Reset field
                          }}
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
                        onChange={(event) => {
                          handleFileChange(event)
                          field.onChange(event.target.files?.[0])
                        }}
                      />
                      <FormMessage />
                    </div>
                  )}
                </div>
              )}
            />
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
            <Button
              type="submit"
              disabled={isLessonVideoCreating || isLessonVideoUpdating}
            >
              {(isLessonVideoCreating || isLessonVideoUpdating) && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}
              {isEdit ? 'Cập nhật' : 'Thêm bài học'}
            </Button>
          </div>
        </form>
      </Form>
      <DialogVideoPreview
        muxPlaybackId={muxPlaybackId}
        isOpen={isOpenVideoPreview}
        setIsOpen={setIsOpenVideoPreview}
      />
    </>
  )
}

export default LessonVideo
