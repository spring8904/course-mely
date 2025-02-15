import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { blogApi } from '@/services/blog/post-api'

export const useGetBlogs = () => {
  return useQuery({
    queryKey: [QUERY_KEY.BLOGS],
    queryFn: () => blogApi.getBlogs(),
  })
}

export const useGetBlogBySlug = (slug?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.BLOGS, slug],
    queryFn: () => blogApi.getBlogBySlug(slug!),
    enabled: !!slug,
  })
}
