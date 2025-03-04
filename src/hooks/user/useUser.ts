import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { userApi } from '@/services/user/user-api'

export const useGetMyCourses = () => {
  return useQuery({
    queryFn: () => userApi.getMyCourses(),
    queryKey: [QUERY_KEY.USER_GET_MY_COURSES],
  })
}

export const useGetProgress = (course: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.COURSE_PROGRESS, course],
    queryFn: () => userApi.getProgress(course),
    enabled: !!course,
  })
}

export const useGetCouponUser = () => {
  return useQuery({
    queryKey: [QUERY_KEY.USER_GET_MY_COUPONS],
    queryFn: () => userApi.getCouponUser(),
  })
}

export const useGenerateCertificate = (slug?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CERTIFICATE, slug],
    queryFn: () => userApi.generateCertificate(slug!),
    enabled: !!slug,
  })
}

export const useGetCertificates = () => {
  return useQuery({
    queryKey: [QUERY_KEY.CERTIFICATE],
    queryFn: () => userApi.getCertificate(),
  })
}

export const useDownloadCertificate = (slug?: string, progress?: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.CERTIFICATE, slug],
    queryFn: () => userApi.downloadCertificate(slug!),
    enabled: !!slug && progress === 100,
  })
}
