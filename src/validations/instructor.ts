import { z } from 'zod'

export const registerInstructorSchema = z
  .object({
    name: z.string().min(1, { message: 'Tên không được để trống' }),
    email: z
      .string()
      .min(1, {
        message: 'Email không được để trống',
      })
      .email({
        message: 'Email không hợp lệ',
      }),
    password: z
      .string()
      .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
    phone: z.string().min(10, { message: 'Số điện thoại không hợp lệ' }),
    address: z.string().min(1, { message: 'Địa chỉ không được để trống' }),
    qa_systems: z
      .object({
        question: z.string().min(1),
        options: z.string().array().nonempty(),
        selected_options: z
          .number()
          .array()
          .min(1, { message: 'Vui lòng chọn câu trả lời' }),
      })
      .array(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  })

export type RegisterInstructorInput = z.infer<typeof registerInstructorSchema>
