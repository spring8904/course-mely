import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { LessonCommentPayload } from '@/validations/comment'
import {
  ProfileBioFormValues,
  UpdateCareerProfilePayload,
  UpdateCertificatesProfilePayload,
  UpdateProfilePayload,
} from '@/validations/profile'
import QUERY_KEY from '@/constants/query-key'
import { commentLessonApi } from '@/services/comment-lesson/comment-lesson-api'
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
    onSuccess: async (res: any) => {
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

    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROFILE] })
      toast.success(res?.message)
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}

export const useUpdateCertificatesProfile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: UpdateCertificatesProfilePayload) =>
      profileApi.updateCertificatesProfile(data),

    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROFILE] })
      toast.success(res?.message)
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}

export const useCreatCareers = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: UpdateCareerProfilePayload) =>
      profileApi.createCareer(data),
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROFILE] })
      toast.success(res?.message)
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}

export const useUpdateCareers = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      data,
      careerId,
    }: {
      data: UpdateCareerProfilePayload
      careerId: string
    }) => profileApi.updateCareer(data, careerId),
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROFILE] })
      toast.success(res?.message)
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}

export const useDeleteCareer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (careerId: string) => profileApi.deleteCareer(careerId),

    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROFILE] })
      toast.success(res?.message)
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra!')
    },
  })
}
