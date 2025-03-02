import { useMutation, useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { ratingApi } from '@/services/rating/rating-api'

export const useStoreRating = () => {
  return useMutation({
    mutationFn: (data: any) => ratingApi.storeRating(data),
  })
}

export const useCheckCourseRatingState = (slug?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.COURSE_RATING_STATE, slug],
    queryFn: () => ratingApi.checkCourseRatingState(slug!),
    enabled: !!slug,
  })
}
