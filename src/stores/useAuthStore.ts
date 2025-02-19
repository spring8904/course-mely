import Cookies from 'js-cookie'
import { create } from 'zustand'

import { IUser } from '@/types'
import { Role } from '@/constants/role'
import { StorageKeys } from '@/constants/storage-keys'
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
  user: getLocalStorage(StorageKeys.USER),
  token: Cookies.get(StorageKeys.ACCESS_TOKEN) || null,
  role: (Cookies.get(StorageKeys.ROLE) as Role) || null,
  isAuthenticated: !!Cookies.get(StorageKeys.ACCESS_TOKEN),

  setUser: (user) => {
    if (user) {
      setLocalStorage(StorageKeys.USER, user)
    } else {
      removeLocalStorage(StorageKeys.USER)
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

  setRole: (role) => {
    if (role) {
      Cookies.set(StorageKeys.ROLE, role, { expires: 7 })
    } else {
      Cookies.remove(StorageKeys.ROLE)
    }
    set({ role, isAuthenticated: !!role })
  },

  logout: () => {
    Cookies.remove(StorageKeys.ACCESS_TOKEN)
    removeLocalStorage(StorageKeys.USER)
    Cookies.remove(StorageKeys.ROLE)
    set({ user: null, token: null, role: null, isAuthenticated: false })
  },
}))
