import z from 'zod'

export const bankInfoSchema = z.object({
  id: z.string(),
  account_no: z
    .string()
    .trim()
    .regex(/^[0-9]+$/, 'Số tài khoản không hợp lệ'),
  account_name: z
    .string()
    .trim()
    .min(3, 'Tên tài khoản không hợp lệ')
    .regex(/^(?:[A-Z]+(?: [A-Z]+)*)$/, 'Tên tài khoản không hợp lệ'),
  acq_id: z.string({
    message: 'Vui lòng chọn ngân hàng',
  }),
  bank_name: z.string(),
})

export type BankInfo = z.infer<typeof bankInfoSchema>
