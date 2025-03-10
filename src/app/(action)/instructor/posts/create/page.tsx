import PostAddView from '@/sections/instructor/view/post-add-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tạo bài viết',
}

const PostPage = () => {
  return <PostAddView />
}

export default PostPage
