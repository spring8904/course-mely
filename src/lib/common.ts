import { StorageKeys } from '@/constants/storage-keys'

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem(StorageKeys.ACCESS_TOKEN) || null
}

export const setAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem(StorageKeys.ACCESS_TOKEN, accessToken)
}

export const removeAccessTokenFromLocalStorage = () => {
  localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
}
