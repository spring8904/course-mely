import PostUpdateView from '@/sections/instructor/view/post-update-view'

type Props = {
  params: { slug: string }
}

const PostUpdatePage = ({ params }: Props) => {
  const { slug } = params
  return <PostUpdateView slug={slug} />
}

export default PostUpdatePage
