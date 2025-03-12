import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
      .regex(/[A-Z]/, {
        message: 'Mật khẩu phải chứa ít nhất 1 ký tự viết hoa',
      })
      .regex(/[a-z]/, {
        message: 'Mật khẩu phải chứa ít nhất 1 ký tự viết thường',
      })
      .regex(/[0-9]/, { message: 'Mật khẩu phải chứa ít nhất 1 số' })
      .regex(/[^A-Za-z0-9]/, {
        message: 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt',
      }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['password_confirmation'],
  })

export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>
