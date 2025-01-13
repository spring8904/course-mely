import { z } from 'zod'

export const storeCourse = z.object({
  category_id: z.string(),
  name: z.string().min(3).max(255),
})
