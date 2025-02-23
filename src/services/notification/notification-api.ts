import api from '@/configs/api'

const prefix = '/users/notifications'

export const notificationApi = {
  getNotifications: async (page = 1) => {
    const response = await api.get(`${prefix}?page=${page}&limit=5`)
    return response.data
  },
  markAsRead: async (id: string) => {
    return await api.put(`${prefix}/${id}/read`)
  },
}
