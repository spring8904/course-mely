import { CreateChapterPayload } from '@/validations/chapter'
import api from '@/configs/api'

const prefix = '/instructor/manage/chapters'

export const getChapters = () => api.get(prefix)

export const getChapterOverview = (slug: string) => api.get(`${prefix}/${slug}`)

export const createChapter = (payload: CreateChapterPayload) =>
  api.post(prefix, payload)

export const updateChapter = (slug: string, payload: CreateChapterPayload) =>
  api.put(`${prefix}/${slug}`, payload)
