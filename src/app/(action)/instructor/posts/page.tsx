import PostManageView from '@/sections/instructor/view/post-manage-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quản lý bài viết',
}

const PostManagePage = () => {
  return <PostManageView />
}

export default PostManagePage
