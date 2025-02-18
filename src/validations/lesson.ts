import { z } from 'zod'

export const createLessonSchema = z.object({
  chapter_id: z.number().int(),
  title: z
    .string()
    .trim()
    .min(3, 'Tiêu đề phải có ít nhất 3 ký tự')
    .max(255, 'Tiêu đề không được vượt quá 255 ký tự'),
  type: z.enum(['video', 'document', 'quiz', 'coding']),
})

export const updateTitleLessonSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Tiêu đề phải có ít nhất 3 ký tự')
    .max(255, 'Tiêu đề không được vượt quá 255 ký tự'),
})

export const lessonVideoSchema = z.object({
  title: z
    .string()
    .min(3, 'Tiêu đề phải có ít nhất 3 ký tự')
    .max(255, 'Tiêu đề không được vượt quá 255 ký tự'),
  video_file: z.any().refine((file) => file instanceof File, {
    message: 'Video là bắt buộc',
  }),
  content: z.string().max(255, 'Nội dung không được vượt quá 255 ký tự'),
  is_free_preview: z.boolean().optional(),
})

export const lessonDocumentSchema = z.object({
  title: z
    .string()
    .min(3, 'Tiêu đề phải có ít nhất 3 ký tự')
    .max(255, 'Tiêu đề không được vượt quá 255 ký tự'),
  file_type: z.enum(['url', 'upload']),
  document_file: z
    .any()
    .refine((file) => file instanceof File || file === null, {
      message: 'Tập tin là bắt buộc và phải là một file hợp lệ',
    })
    .optional(),
  document_url: z.string().optional(),
  content: z
    .string()
    .min(1, 'Nội dung là bắt buộc')
    .max(255, 'Nội dung không được vượt quá 255 ký tự'),
})

export const lessonQuizSchema = z.object({
  title: z
    .string()
    .min(3, 'Tiêu đề phải có ít nhất 3 ký tự')
    .max(255, 'Tiêu đề không được vượt quá 255 ký tự'),
  content: z
    .string()
    .min(1, 'Nội dung là bắt buộc')
    .max(255, 'Nội dung không được vượt quá 255 ký tự'),
})

export type CreateLessonPayload = z.infer<typeof createLessonSchema>
export type UpdateTitleLessonPayload = z.infer<typeof updateTitleLessonSchema>
export type LessonVideoPayload = z.infer<typeof lessonVideoSchema>
export type LessonDocumentPayload = z.infer<typeof lessonDocumentSchema>
export type LessonQuizPayload = z.infer<typeof lessonQuizSchema>
