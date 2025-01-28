import React from 'react'
import { Metadata } from 'next'

import { BlogListView } from '@/sections/blogs/view'

export const metadata: Metadata = {
  title: 'Danh sách bài viết',
}

const BlogListPage = () => {
  return <BlogListView />
}

export default BlogListPage
