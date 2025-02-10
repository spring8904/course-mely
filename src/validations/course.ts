import { z } from 'zod'

export const createCourseSchema = z.object({
  category_id: z.coerce
    .number({
      message: 'Vui lòng chọn danh mục',
    })
    .int(),
  name: z
    .string()
    .min(3, 'Tiêu đề phải có ít nhất 3 ký tự')
    .max(255, 'Tiêu đề không được vượt quá 255 ký tự'),
})

export type CreateCoursePayload = z.infer<typeof createCourseSchema>
