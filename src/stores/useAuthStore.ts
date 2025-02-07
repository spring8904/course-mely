import Cookies from 'js-cookie'
import { create } from 'zustand'

import { IUser } from '@/types'

const getUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user')
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
  token: Cookies.get('access_token') || null,
  isAuthenticated: !!Cookies.get('access_token'),

  setUser: (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
    set({ user })
  },

  setToken: (token) => {
    if (token) {
      Cookies.set('access_token', token, { expires: 7 })
    } else {
      Cookies.remove('access_token')
    }
    set({ token, isAuthenticated: !!token })
  },

  logout: () => {
    Cookies.remove('access_token')
    localStorage.removeItem('user')
    set({ user: null, token: null, isAuthenticated: false })
  },
}))
