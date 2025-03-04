import React from 'react'
import Image from 'next/image'

interface BlogDetailPostProps {
  initialBlogDetail: any
}

const BlogDetailProfileItem = ({ initialBlogDetail }: BlogDetailPostProps) => {
  return (
    <div className="profile-item">
      <div className="image">
        <Image
          layout="fill"
          src={initialBlogDetail.user.avatar}
          alt={initialBlogDetail.user.name}
        />
      </div>
      <div className="content">
        <h5>
          <a className="fw-5">{initialBlogDetail.user.name}</a>
        </h5>
        <div className="sub fs-15">Professional Web Developer</div>
        <div className="fs-15">
          Lorem ipsum dolor sit amet. Qui incidunt dolores non similique ducimus
          et debitis molestiae. Et autem quia eum reprehenderit voluptates est
          reprehenderit illo est enim perferendis est neque sunt.{' '}
        </div>
      </div>
    </div>
  )
}

export default BlogDetailProfileItem
