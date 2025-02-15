import { CreateWishListPayload } from '@/validations/wish-list'
import api from '@/configs/api'

const prefix = '/wish-lists'

export const wishListApi = {
  getWishLists: async () => {
    return await api.get(prefix)
  },
  createWishList: async (data: CreateWishListPayload) => {
    return await api.post(prefix, data)
  },
  deleteWishList: async (id: number) => {
    return await api.delete(`${prefix}/${id}`)
  },
}
