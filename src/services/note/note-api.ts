import { CreateNotePayload, UpdateNotePayload } from '@/validations/note'
import api from '@/configs/api'

const prefix = 'notes'

export const noteApi = {
  getNotes: async (
    slug: string,
    filters?: { chapterId?: number | null; sortOrder?: 'asc' | 'desc' }
  ) => {
    const params = filters ? filters : {}
    return await api.get(`${prefix}/${slug}/get-notes`, { params })
  },
  storeNote: async (data: CreateNotePayload): Promise<any> => {
    return await api.post(`${prefix}`, data)
  },
  updateNote: async (id: string, data: UpdateNotePayload) => {
    return await api.put(`${prefix}/${id}`, data)
  },
  deleteNote: async (id: string) => {
    return await api.delete(`${prefix}/${id}`)
  },
}
