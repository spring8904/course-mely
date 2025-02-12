import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json'
  }

  return config
})

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 201 && response.data && response.data.message) {
      toast.success(response.data.message)
    }
    return response.data
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response

      switch (status) {
        case 401: {
          console.log('Unauthorized', data)
          break
        }
        case 403: {
          toast.error('Forbidden', data)
          break
        }
        case 404: {
          console.log('Not Found', data)
          break
        }
        case 422: {
          console.log('Unprocessable Entity', data)
          break
        }
        case 500: {
          console.log('Internal Server Error', data)
          break
        }
        default:
          console.log('Error', data)
      }
    } else if (error.request) {
      toast.error('No response received from the server')
    } else {
      console.log('Network Error')
      toast.error('Error: ' + error.message)
    }

    return Promise.reject(error)
  }
)

export default api
