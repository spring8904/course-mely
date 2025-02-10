import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BACKEND_URL || 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  config.headers.Accept = 'application/json'
  config.headers['Content-Type'] = 'multipart/form-data'

  return config
})

api.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data
    }
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response

      switch (status) {
        case 401: {
          console.log('401', data)
          break
        }
        case 403: {
          console.log('403', data)
          break
        }
        case 404: {
          console.log('404', data)
          break
        }
        case 422: {
          console.log('422', data)
          break
        }
        case 500: {
          console.log('500', data)
          break
        }
      }
    } else {
      console.log('Network Error')
    }

    return Promise.reject(error)
  }
)

export default api
