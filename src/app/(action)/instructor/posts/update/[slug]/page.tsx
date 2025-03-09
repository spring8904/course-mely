import PostUpdateView from '@/sections/instructor/view/post-update-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chỉnh sửa bài viết',
}

type Props = {
  params: { slug: string }
}

const PostUpdatePage = ({ params }: Props) => {
  const { slug } = params
  return <PostUpdateView slug={slug} />
}

export default PostUpdatePage
