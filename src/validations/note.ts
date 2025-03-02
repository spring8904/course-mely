import { z } from 'zod'

export const noteSchema = z.object({
  lesson_id: z.number().int(),
  time: z.number().int(),
  content: z.string().min(1, { message: 'Vui lòng nhập nội dung' }),
})

export type NotePayload = z.infer<typeof noteSchema>
