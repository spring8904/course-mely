import { z } from 'zod'

export const storeCourse = z.object({
  category_id: z.coerce.number({
    message: 'Vui lòng chọn danh mục',
    required_error: 'Vui lòng chọn danh mục',
  }),
  name: z
    .string()
    .min(3, {
      message: 'Tiêu đề khoá học phải chứa ít nhất 3 ký tự',
    })
    .max(255, {
      message: 'Tiêu đề khoá học không được vượt quá 255 ký tự',
    }),
})
