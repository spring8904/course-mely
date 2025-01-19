'use client'

import { BlogDetailView } from '@/sections/blogs/view'

interface Props {
  params: {
    slug: string
  }
}

const BlogDetailPage = ({ params }: Props) => {
  const { slug } = params
  return <BlogDetailView slug={slug} />
}

export default BlogDetailPage
