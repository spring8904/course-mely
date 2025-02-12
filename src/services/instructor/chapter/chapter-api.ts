import { CreateChapterPayload } from '@/validations/chapter'
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
  updateChapter: (slug: string, payload: CreateChapterPayload) => {
    return api.put(`${prefix}/${slug}`, payload)
  },
}
