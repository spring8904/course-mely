import { z } from 'zod'

export const createChapterSchema = z.object({
  slug: z.string().min(1),
  title: z
    .string()
    .min(3, 'Tiêu đề phải có ít nhất 3 ký tự')
    .max(255, 'Tiêu đề không được vượt quá 255 ký tự'),
})

export const updateChaterSchema = z.object({
  title: z
    .string()
    .min(3, 'Tiêu đề phải có ít nhất 3 ký tự')
    .max(255, 'Tiêu đề không được vượt quá 255 ký tự'),
})

export type CreateChapterPayload = z.infer<typeof createChapterSchema>
export type UpdateChapterPayload = z.infer<typeof updateChaterSchema>
