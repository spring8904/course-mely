import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { fakePosts } from '@/sections/home/data/data'
import { Calendar, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface PostListProps {
  className?: string
  title: string
  description?: string
  // posts: IPost[]
}

const PostList = ({ title, description, className }: PostListProps) => {
  return (
    <div className={cn('w-full bg-[#FFFFFF] pb-10 pt-7', className)}>
      <div
        className={cn(
          'container mx-auto flex flex-col gap-8 p-3',
          'lg:p-5',
          'xl:p-10'
        )}
      >
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold leading-6">{title}</h3>

            <Link
              href={`/post/}`}
              className={cn(buttonVariants({ variant: 'default' }))}
            >
              Xem tất cả
            </Link>
          </div>

          <p>{description}</p>
        </div>

        <div
          className={cn(
            'grid grid-cols-1 gap-2',
            'md:grid-cols-2 md:gap-4',
            'lg:grid-cols-3 lg:gap-6'
          )}
        >
          {fakePosts?.map((post) => (
            <Card
              key={post.id}
              className="rounded-lg border-none"
              style={{
                boxShadow:
                  '0px 4px 6px -2px rgba(16, 24, 40, 0.25), 0px 12px 16px -4px rgba(16, 24, 40, 0.25)',
              }}
            >
              <CardContent className="flex flex-col p-6">
                <div className="relative h-60">
                  <Image
                    // src="https://s3-alpha-sig.figma.com/img/52dc/217a/00d7a1cbbce25c955a5fab2180048f24?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iEUXpb2~h5cck6t8tCRnJPpfRl0AY2hpCZRFEJD1lKxKiAjcHF95AYndWk0krDIu6ULkE19FW0KBK9rD5tioj5bgBOco0IcUcyYx1kTMXI5o~-sh2Du-Zy1UgaSq1IPwEU7rx2R0feImFmGjFsk9UwUGOdcXciS0tl4ZbJqFM9~Jhlfmea51i2vpQSSFO63O-5it8q284-mHKSgjrD21yGi1Vn~A0znwK1MUti9NhQHSINkr85WwWLhP-UI1AwjyYqH0aaii~mebW6Tm1CSZ6ZG6ka~RfT-TzMeOB21SMMi83srDxeP4BnVS9zJbufVallGb~2le8LG4acmJv~5S7A__"
                    src={post.thumbnail!}
                    alt={post.title}
                    fill
                  />
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Calendar />
                    {post.publishedAt?.toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-1">
                    <MessageSquare />
                    {post.view}
                  </div>
                </div>

                <h4 className="mt-2 line-clamp-1 text-2xl font-semibold text-[#101828]">
                  {post.title}
                </h4>

                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href={`/post/${post.slug}`}
                    className={cn(buttonVariants({ variant: 'default' }))}
                  >
                    Đọc thêm
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
export default PostList
