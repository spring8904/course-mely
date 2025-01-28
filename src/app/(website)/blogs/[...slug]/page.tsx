import { BlogDetailView } from '@/sections/blogs/view'

// import { getPostBySlug } from '@/services/posts/post-api'
// import { Metadata, ResolvingMetadata } from 'next'

interface Props {
  params: {
    slug: string
  }
}

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const { slug } = params

//   const post = await getPostBySlug(slug)

//   const previousImages = (await parent).openGraph?.images || []

//   return {
//     title: post.title,
//     description: post.description,
//     openGraph: {
//       title: post.title,
//       description: post.description || undefined,
//       images: [post.thumbnail, ...previousImages].filter(
//         (img): img is string => !!img
//       ),
//     },
//   }
// }

const BlogDetailPage = ({ params }: Props) => {
  const { slug } = params
  return <BlogDetailView slug={slug} />
}

export default BlogDetailPage
