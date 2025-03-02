import { NotePayload } from '@/validations/note'
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
  storeNote: async (data: NotePayload) => {
    return await api.post(`${prefix}`, data)
  },
}
