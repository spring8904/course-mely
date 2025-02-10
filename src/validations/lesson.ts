import { z } from 'zod'

export const createLessonSchema = z.object({
  chapter_id: z.number().int(),
  title: z
    .string()
    .min(3, 'Tiêu đề phải có ít nhất 3 ký tự')
    .max(255, 'Tiêu đề không được vượt quá 255 ký tự'),
  type: z.enum(['video', 'document', 'quiz', 'coding']),
})

export type CreateLessonPayload = z.infer<typeof createLessonSchema>
