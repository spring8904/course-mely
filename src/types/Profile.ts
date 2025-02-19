import { z } from 'zod'

export const updateProfile = z.object({
  name: z
    .string()
    .trim()
    .min(5, 'Tên của bạn tối thiếu 5 ký tự!')
    .max(20, 'Tên của bạn không được vượt quá 20 ký tự!'),
  phone: z.string().trim().min(10, 'Số điện thoại tối thiểu 10 số!'),
  address: z.string().optional(),
  about_me: z.string().optional(),
})

export const profileBioSchema = z.object({
  github: z.string().url('URL phải là một dẫn!').optional(),
  website: z.string().url('URL phải là một dẫn!').optional(),
  youtube: z.string().url('URL phải là một dẫn!').optional(),
  facebook: z.string().url('URL phải là một dẫn!').optional(),
  twitter: z.string().url('URL phải là một dẫn!').optional(),
  linkedin: z.string().url('URL phải là một dẫn!').optional(),
  instagram: z.string().url('URL phải là một dẫn!').optional(),
})

export type UpdateProfilePayload = z.infer<typeof updateProfile>
export type ProfileBioFormValues = z.infer<typeof profileBioSchema>
