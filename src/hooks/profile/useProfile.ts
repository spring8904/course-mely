import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { ProfileBioFormValues, UpdateProfilePayload } from '@/types/Profile'
import QUERY_KEY from '@/constants/query-key'
import { profileApi } from '@/services/profile/profile-api'

export const useGetProfile = () => {
  return useQuery({
    queryKey: [QUERY_KEY.PROFILE],
    queryFn: () => profileApi.getProfile(),
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateProfilePayload) => profileApi.updateProfile(data),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.PROFILE],
      })
      const successMessage = res?.message
      toast.success(successMessage)
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}
export const useUpdateBioProfile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: ProfileBioFormValues) =>
      profileApi.updateBioProfile(data),

    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROFILE] })
      toast.success(res?.message)
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}
