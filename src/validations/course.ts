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

export const updateCourseSchema = z
  .object({
    category_id: z.coerce
      .number({
        message: 'Vui lòng chọn danh mục',
      })
      .int(),
    name: z
      .string()
      .min(3, 'Tiêu đề phải có ít nhất 3 ký tự')
      .max(255, 'Tiêu đề không được vượt quá 255 ký tự'),
    description: z
      .string()
      .max(255, 'Mô tả khoá học không được vượt quá 255 ký tự')
      .optional(),
    thumbnail: z
      .instanceof(File, { message: 'Vui lòng chọn một tệp ảnh hợp lệ' })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: 'Ảnh không được lớn hơn 5MB',
      })
      .refine(
        (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
        { message: 'Chỉ chấp nhận định dạng ảnh JPG, PNG, hoặc WEBP' }
      )
      .optional(),
    price: z.coerce
      .number({
        message: 'Vui lòng nhập giá khoá học',
      })
      .int()
      .positive('Giá phải là số dương')
      .max(10000000, 'Giá không được vượt quá 10.000.000 triệu')
      .optional(),
    intro: z
      .instanceof(File, { message: 'Vui lòng chọn một tệp video hợp lệ' })
      .refine((file) => file.size <= 50 * 1024 * 1024, {
        message: 'Video không được lớn hơn 50MB',
      })
      .refine((file) => file.type === 'video/mp4', {
        message: 'Chỉ chấp nhận định dạng video MP4',
      })
      .optional(),
    price_sale: z.coerce
      .number({
        message: 'Vui lòng nhập giá khuyến mãi',
      })
      .int()
      .nonnegative('Giá khuyến mãi phải lớn hơn hoặc bằng 0')
      .optional(),
    is_free: z.enum(['0', '1'], {
      errorMap: () => ({
        message: 'Trường này chỉ được nhận giá trị 0 hoặc 1.',
      }),
    }),
    level: z.enum(['beginner', 'intermediate', 'advanced'], {
      errorMap: () => ({ message: 'Vui lòng chọn cấp độ hợp lệ' }),
    }),
    benefits: z
      .array(z.string())
      .min(4, { message: 'Bạn cần ít nhất 4 lợi ích' }), // mảng phải có ít nhất 4 lợi ích
    requirements: z
      .array(z.string())
      .min(4, { message: 'Bạn cần ít nhất 4 yêu cầu' }), // mảng phải có ít nhất 4 yêu cầu
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answers: z.string(),
        })
      )
      .optional(),
    visibility: z.enum(['public', 'private'], {
      errorMap: () => ({ message: 'Vui lòng chọn quyền riêng tư hợp lệ' }),
    }),
  })
  .superRefine((data: number | any, ctx) => {
    if (data.is_free === '0') {
      if (!data.price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['price'],
          message: 'Vui lòng nhập giá khoá học',
        })
      } else if (data.price <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['price'],
          message: 'Giá phải là số dương',
        })
      }

      if (data.price_sale && data.price_sale > data.price * 0.6) {
        const maxPriceSale = Math.floor(data.price * 0.6)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['price_sale'],
          message: `Giá khuyến mãi không được cao hơn 60% (${maxPriceSale}) giá gốc`,
        })
      }
    }
  })

export type UpdateCoursePayload = z.infer<typeof updateCourseSchema>
export type CreateCoursePayload = z.infer<typeof createCourseSchema>
