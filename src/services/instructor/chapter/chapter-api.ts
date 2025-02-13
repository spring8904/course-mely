import {
  CreateChapterPayload,
  UpdateChapterPayload,
} from '@/validations/chapter'
import api from '@/configs/api'

const prefix = '/instructor/manage/chapters'

export const instructorChapterApi = {
  getChapters: async () => {
    return await api.get(prefix)
  },
  getChapterOverview: async (slug: string) => {
    return await api.get(`${prefix}/${slug}`)
  },
  createChapter: (payload: CreateChapterPayload) => {
    return api.post(prefix, payload)
  },
  updateChapter: (slug: string, id: number, payload: UpdateChapterPayload) => {
    return api.put(`${prefix}/${slug}/${id}`, payload)
  },
  deleteChapter: (slug: string, id: number) => {
    return api.delete(`${prefix}/${slug}/${id}`)
  },
}
