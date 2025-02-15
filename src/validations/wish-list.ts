import { z } from 'zod'

export const createWishList = z.object({
  course_id: z.number().min(1),
})

export type CreateWishListPayload = z.infer<typeof createWishList>
