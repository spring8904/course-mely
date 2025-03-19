import { z } from 'zod'

export const membershipSchema = z.object({
  name: z
    .string()
    .min(3, 'Tên gói phải có ít nhất 3 ký tự')
    .max(255, 'Tên gói không được vượt quá 255 ký tự'),
  description: z.string(),
  price: z.number(),
  duration_months: z.number(),
  benefits: z.array(z.string()),
  course_ids: z.array(z.number()),
})

export type MembershipPayload = z.infer<typeof membershipSchema>
