import { z } from 'zod'

export const noteSchema = z.object({
  lesson_id: z.any(),
  time: z.any().optional(),
  content: z.string().min(1, { message: 'Vui lòng nhập nội dung' }),
})

export type NotePayload = z.infer<typeof noteSchema>
