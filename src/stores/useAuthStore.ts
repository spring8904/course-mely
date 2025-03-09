import Cookies from 'js-cookie'
import { create } from 'zustand'

import { IUser } from '@/types'
import { Role } from '@/constants/role'
import StorageKey from '@/constants/storage-key'
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@/lib/common'

interface UserState {
  user: IUser | null
  token: string | null
  role: Role | null
  isAuthenticated: boolean
  setUser: (user: IUser | null) => void
  setToken: (token: string | null) => void
  setRole: (role: Role | null) => void
  logout: () => void
}

export const useAuthStore = create<UserState>((set) => ({
  user: getLocalStorage(StorageKey.USER),
  token: Cookies.get(StorageKey.ACCESS_TOKEN) || null,
  role: (Cookies.get(StorageKey.ROLE) as Role) || null,
  isAuthenticated: !!Cookies.get(StorageKey.ACCESS_TOKEN),

  setUser: (user) => {
    if (user) {
      setLocalStorage(StorageKey.USER, user)
    } else {
      removeLocalStorage(StorageKey.USER)
    }
    set({ user })
  },

  setToken: (token) => {
    if (token) {
      Cookies.set(StorageKey.ACCESS_TOKEN, token, { expires: 7 })
    } else {
      Cookies.remove(StorageKey.ACCESS_TOKEN)
    }
    set({ token, isAuthenticated: !!token })
  },

  setRole: (role) => {
    set((state) => {
      if (state.role === role) {
        return state
      }
      if (role) {
        Cookies.set(StorageKey.ROLE, role, { expires: 7 })
      } else {
        Cookies.remove(StorageKey.ROLE)
      }
      return { ...state, role }
    })
  },

  logout: () => {
    Cookies.remove(StorageKey.ACCESS_TOKEN)
    removeLocalStorage(StorageKey.USER)
    Cookies.remove(StorageKey.ROLE)
    set({ user: null, token: null, role: null, isAuthenticated: false })
  },
}))
