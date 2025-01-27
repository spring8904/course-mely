import { BlogListView } from '@/sections/blogs/view'
import React from 'react'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Danh sách bài viết',
}

const BlogListPage = () => {
  return <BlogListView />
}

export default BlogListPage
