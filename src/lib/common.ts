export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('access_token') || null
}

export const setAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken)
}

export const removeAccessTokenFromLocalStorage = () => {
  localStorage.removeItem('access_token')
}
