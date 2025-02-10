import api from '@/configs/api'

const prefix = '/categories'

export const getCategories = async () => {
  const { data } = await api.get(`${prefix}`)
  return data
}
