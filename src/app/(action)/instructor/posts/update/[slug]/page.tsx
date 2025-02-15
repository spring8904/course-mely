import { PostUpdateView } from '@/sections/instructor/post/view'

type Props = {
  params: { slug: string }
}

const PostUpdatePage = ({ params }: Props) => {
  const { slug } = params
  return <PostUpdateView slug={slug} />
}

export default PostUpdatePage
