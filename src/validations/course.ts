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

export const updateCourseSchema = z.object({
  category_id: z.coerce
    .number({
      message: 'Vui lòng chọn danh mục',
    })
    .int(),
  name: z
    .string()
    .min(3, 'Tiêu đề phải có ít nhất 3 ký tự')
    .max(255, 'Tiêu đề không được vượt quá 255 ký tự'),
  description: z.string().optional(),
  thumbnail: z
    .instanceof(File, { message: 'Vui lòng chọn một tệp ảnh hợp lệ' })

    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'Ảnh không được lớn hơn 5MB',
    })
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      { message: 'Chỉ chấp nhận định dạng ảnh JPG, PNG, hoặc WEBP' }
    ),
  price: z.coerce
    .number({
      message: 'Vui lòng nhập giá khoá học',
    })
    .int()
    .positive('Giá phải là số dương'),
  intro: z
    .instanceof(File, { message: 'Vui lòng chọn một tệp video hợp lệ' })
    .refine((file) => file.size <= 50 * 1024 * 1024, {
      message: 'Video không được lớn hơn 50MB',
    })
    .refine((file) => file.type === 'video/mp4', {
      message: 'Chỉ chấp nhận định dạng video MP4',
    }),
  price_sale: z.coerce
    .number()
    .int()
    .positive()
    .max(60, { message: 'Giảm giá không được vượt quá 60% giá gốc' })
    .optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced'], {
    errorMap: () => ({ message: 'Vui lòng chọn cấp độ hợp lệ' }),
  }),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  faqs: z
    .array(
      z.object({
        question: z.string().min(3, 'Câu hỏi phải có ít nhất 3 ký tự'),
        answer: z.string().min(3, 'Câu trả lời phải có ít nhất 3 ký tự'),
      })
    )
    .optional(),
  status: z.string().optional(),
})

export type UpdateCoursePayload = z.infer<typeof updateCourseSchema>
export type CreateCoursePayload = z.infer<typeof createCourseSchema>
