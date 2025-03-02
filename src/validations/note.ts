import { z } from 'zod'

export const createNoteSchema = z.object({
  lesson_id: z.string(),
  time: z.number().int(),
  content: z.string({
    required_error: 'Vui lòng nhập nội dung',
  }),
})

export const updateNoteSchema = z.object({
  lesson_id: z.string(),
  content: z.string({
    required_error: 'Vui lòng nhập nội dung',
  }),
})

export type CreateNotePayload = z.infer<typeof createNoteSchema>
export type UpdateNotePayload = z.infer<typeof updateNoteSchema>
