import Cookies from 'js-cookie'
import { create } from 'zustand'

import { IUser } from '@/types'
import { StorageKeys } from '@/constants/storage-keys'

const getUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem(StorageKeys.USER)
    return user ? JSON.parse(user) : null
  }
  return null
}

interface UserState {
  user: IUser | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: IUser | null) => void
  setToken: (token: string | null) => void
  logout: () => void
}

export const useAuthStore = create<UserState>((set) => ({
  user: getUserFromLocalStorage(),
  token: Cookies.get(StorageKeys.ACCESS_TOKEN) || null,
  isAuthenticated: !!Cookies.get(StorageKeys.ACCESS_TOKEN),

  setUser: (user) => {
    if (user) {
      localStorage.setItem(StorageKeys.USER, JSON.stringify(user))
    } else {
      localStorage.removeItem(StorageKeys.USER)
    }
    set({ user })
  },

  setToken: (token) => {
    if (token) {
      Cookies.set(StorageKeys.ACCESS_TOKEN, token, { expires: 7 })
    } else {
      Cookies.remove(StorageKeys.ACCESS_TOKEN)
    }
    set({ token, isAuthenticated: !!token })
  },

  logout: () => {
    Cookies.remove(StorageKeys.ACCESS_TOKEN)
    localStorage.removeItem(StorageKeys.USER)
    set({ user: null, token: null, isAuthenticated: false })
  },
}))
