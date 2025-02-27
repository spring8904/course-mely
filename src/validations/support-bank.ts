import { z } from 'zod'

export const WithdrawalRequestSchema = z.object({
  account_no: z
    .string()
    .min(1, 'Vui lòng nhập số tài khoản')
    .regex(/^\d+$/, 'Số tài khoản không hợp lệ'),
  account_name: z
    .string()
    .min(1, 'Vui lòng nhập tên')
    .max(255, 'Tên không được quá 255 ký tự'),
  acq_id: z
    .string()
    .min(1, 'Vui lòng chọn ngân hàng')
    .regex(/^\d+$/, 'Vui lòng chọn ngân hàng'),
  bank: z.string().min(1, 'Vui lòng chọn ngân hàng'),
  bank_name: z.string().min(1, 'Vui lòng chọn ngân hàng'),
  amount: z.number().positive('Số tiền phải lớn hơn 0'),
  add_info: z.string().min(1, 'Nhập thông tin'),
})

export type WithDrawalRequestPayload = z.infer<typeof WithdrawalRequestSchema>
