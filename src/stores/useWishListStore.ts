import { create } from 'zustand'

interface WishListState {
  wishList: number[]
  addToWishList: (id: number) => void
  removeFromWishList: (id: number) => void
  setWishList: (ids: number[]) => void
}

export const useWishListStore = create<WishListState>((set) => ({
  wishList: [],
  addToWishList: (id) =>
    set((state) => ({ wishList: [...state.wishList, id] })),
  removeFromWishList: (id) =>
    set((state) => ({
      wishList: state.wishList.filter((item) => item !== id),
    })),
  setWishList: (ids) => set({ wishList: ids }),
}))
