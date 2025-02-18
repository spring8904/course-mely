import React, { useCallback, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import {
  LessonDocumentPayload,
  lessonDocumentSchema,
} from '@/validations/lesson'
import QUERY_KEY from '@/constants/query-key'
import { useCreateLessonDocument } from '@/hooks/instructor/lesson/useLesson'

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
import TinyEditor from '@/components/shared/tiny-editor'

type Props = {
  chapterId?: string
  onHide: () => void
}

const LessonDocument = ({ chapterId, onHide }: Props) => {
  const queryClient = useQueryClient()

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [fileType, setFileType] = useState<'document_file' | 'document_url'>('')
  const [selectedFile, setSelectedFile] = useState<any>(null)

  const { mutate: createLessonDocument, isPending: isLessonDocumentCreating } =
    useCreateLessonDocument()

  const form = useForm<LessonDocumentPayload>({
    resolver: zodResolver(lessonDocumentSchema),
    defaultValues: {
      title: '',
      content: '',
      file_type: 'upload',
      document_file: null as any,
      document_url: '',
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      form.setValue('document_file', file)
      setSelectedFile(file)
    }
  }

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleResetClick = useCallback(() => {
    form.setValue('document_file', null as unknown as File)
    setSelectedFile(null)
  }, [form])

  const handleFileTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFileType(e.target.value as 'document_file' | 'document_url')
    setSelectedFile(null)
    form.setValue('document_file', null as any)
  }

  const handleClose = () => {
    onHide()
  }

  const onSubmit = (data: LessonDocumentPayload) => {
    if (fileType === 'document_file' && !data.document_file) {
      return alert('Vui lòng tải lên tệp dữ liệu.')
    }
    if (isLessonDocumentCreating) return

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)
    if (fileType === 'document_file') {
      formData.append('document_file', selectedFile)
    } else {
      formData.append('document_url', String(data.document_url))
    }
    formData.append('chapter_id', String(chapterId))

    createLessonDocument(
      {
        chapterId: chapterId as string,
        payload: formData,
      },
      {
        onSuccess: async (res: any) => {
          await queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
          })

          form.reset()
          onHide()
          toast.success(res.message)
        },
        onError: () => {
          toast.error('Có lỗi xảy ra khi tạo bài học')
        },
      }
    )
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="font-semibold">Thêm tài liệu</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      onEditorChange={(value: string) => {
                        form.setValue('content', value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-4">
            <FormField
              control={form.control}
              name="file_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bạn có thể tải file tài liệu ở đây</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      value={fileType}
                      onChange={handleFileTypeChange}
                      className="w-full rounded-lg border border-gray-300 p-2"
                    >
                      <option value="">Chọn loại tài liệu</option>
                      <option value="document_file">Tải lên tệp</option>
                      <option value="document_url">URL tài liệu</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {fileType === 'document_file' && (
            <div className="my-2">
              <div className="flex flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-gray-300 p-5">
                <span className="text-xs">
                  Tải dữ liệu video hoặc kéo thả vào đây
                </span>
                <button
                  type="button"
                  className="rounded-lg border border-black p-4 font-medium transition-all duration-300 ease-in-out hover:bg-[#404040] hover:text-white"
                  onClick={handleUploadClick}
                >
                  Tải lên tệp
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
              <FormMessage>
                {form.formState.errors.document_file && (
                  <p className="mt-2 text-xs text-red-500">
                    {String(form.formState.errors.document_file.message) ||
                      undefined}
                  </p>
                )}
              </FormMessage>
            </div>
          )}
          {selectedFile && (
            <div className="mt-2 flex w-full items-center justify-between">
              <p className="text-left text-sm font-medium">
                Đã chọn tài liệu: {selectedFile?.name || ''}
              </p>
              <button
                onClick={handleResetClick}
                type="button"
                className="rounded-lg border bg-red-500 px-6 py-2 font-medium text-white hover:bg-red-600"
              >
                Tải lại
              </button>
            </div>
          )}
          {fileType === 'document_url' && (
            <div className="my-2">
              <FormField
                control={form.control}
                name="document_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL tài liệu</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="Nhập URL tài liệu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <div className="mt-4 flex items-center justify-end">
            <Button onClick={handleClose} className="mr-3" variant="secondary">
              Huỷ
            </Button>
            <Button type="submit" disabled={isLessonDocumentCreating}>
              {isLessonDocumentCreating && (
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

export default LessonDocument
