import * as z from 'zod'

export const createLiveSessionSchema = z.object({
  title: z.string().min(1, 'Tiêu đề không được để trống'),
  description: z.string().optional(),
  start_time: z.string().min(1, 'Thời gian bắt đầu không được để trống'),
})

export const createLiveSessionMessageSchema = z.object({
  message: z
    .string()
    .nonempty({ message: 'Tin nhắn không được để trống' })
    .min(1, { message: 'Tin nhắn phải có ít nhất 1 ký tự' }),
})

export type CreateLiveStreamPayload = z.infer<typeof createLiveSessionSchema>
export type CreateLiveSessionMessagePayload = z.infer<
  typeof createLiveSessionMessageSchema
>
