import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import QueryKey from '@/constants/query-key'
import { noteApi } from '@/services/note/note-api'
import { toast } from 'react-toastify'
import { UpdateNotePayload } from '@/validations/note'

export const useGetNotes = (
  slug?: string,
  filters?: { chapterId?: number | null; sortOrder?: 'asc' | 'desc' }
) => {
  return useQuery({
    queryKey: [QueryKey.NOTE_LESSON, slug, filters],
    queryFn: () => noteApi.getNotes(slug!, filters),
    enabled: !!slug,
  })
}

export const useStoreNote = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: noteApi.storeNote,
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.NOTE_LESSON],
      })
      toast.success(res.message)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useUpdateNote = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateNotePayload }) =>
      noteApi.updateNote(id, data),
  })
}

export const useDeleteNote = () => {
  return useMutation({
    mutationFn: (id: string) => noteApi.deleteNote(id),
  })
}
