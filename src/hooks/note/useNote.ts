import { useMutation, useQuery } from '@tanstack/react-query'

import { NotePayload } from '@/validations/note'
import QUERY_KEY from '@/constants/query-key'
import { noteApi } from '@/services/note/note-api'

export const useGetNotes = (
  slug?: string,
  filters?: { chapterId?: number | null; sortOrder?: 'asc' | 'desc' }
) => {
  return useQuery({
    queryKey: [QUERY_KEY.NOTE_LESSON, slug, filters],
    queryFn: () => noteApi.getNotes(slug!, filters),
    enabled: !!slug,
    staleTime: 1000 * 60 * 60 * 24,
  })
}

export const useStoreNote = () => {
  return useMutation({
    mutationFn: (data: NotePayload) => noteApi.storeNote(data),
  })
}
