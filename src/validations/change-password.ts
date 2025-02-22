import { z } from 'zod'

export const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, 'Mật khẩu là bắt buộc.'),
    new_password: z
      .string()
      .min(1, 'Mật khẩu là bắt buộc.')
      .min(8, 'Mật khẩu mới phải có ít nhất 8 ký tự.')
      .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa.'),
    confirm_new_password: z.string().min(1, 'Vui lòng xác nhận mật khẩu.'),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: 'Mật khẩu xác nhận không khớp.',
    path: ['confirm_new_password'],
  })

export type ChangePasswordPayload = z.infer<typeof changePasswordSchema>
