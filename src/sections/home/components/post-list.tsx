interface PostListProps {
  className?: string
  title: string
  description?: string
}

export const fakePosts = [
  {
    imageUrl: '/assets/images/blog/blog-01.jpg',
    category: 'Development',
    title: 'The Technical Certifications That Matter Most for the Future',
    link: 'blog-single.html',
    date: '06 April 2024',
    commentsCount: 14,
    author: 'Esther Howard',
    authorLink: '#',
  },
  {
    imageUrl: '/assets/images/blog/blog-02.jpg',
    category: 'Development',
    title: 'How to Become a Web Designer: A Comprehensive Guide',
    link: 'blog-single.html',
    date: '06 April 2024',
    commentsCount: 14,
    author: 'Floyd Miles',
    authorLink: '#',
  },
  {
    imageUrl: '/assets/images/blog/blog-02.jpg',
    category: 'Development',
    title: 'How to Become a Web Designer: A Comprehensive Guide',
    link: 'blog-single.html',
    date: '06 April 2024',
    commentsCount: 14,
    author: 'Floyd Miles',
    authorLink: '#',
  },
  // Add more posts here
]

const PostList = ({ title, description, className }: PostListProps) => {
  return (
    <section className="section-blog tf-spacing-7 pt-0">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section">
              <h2 className="fw-7 wow fadeInUp" data-wow-delay="0s">
                {title}
              </h2>
              <div className="flex flex-wrap items-center justify-between gap-10">
                <div className="sub fs-15 wow fadeInUp" data-wow-delay="0.2s">
                  {description}
                </div>
                <a
                  href="blog-grid.html"
                  className="tf-btn-arrow wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  Xem thêm <i className="icon-arrow-top-right" />
                </a>
              </div>
            </div>
            <div
              className="swiper-container tf-sw-mobile wow fadeInUp"
              data-wow-delay="0.4s"
              data-preview={4}
              data-space={28}
            >
              <div className="swiper-wrapper grid-sw-4">
                {fakePosts.map((post, index) => (
                  <div className="swiper-slide" key={index}>
                    <div className="blog-article-item hover-img">
                      <div className="article-thumb image-wrap">
                        <img
                          className="lazyload"
                          data-src={post.imageUrl}
                          src={post.imageUrl}
                          alt={post.title}
                        />
                      </div>
                      <div className="article-content">
                        <div className="article-label">
                          <a href={post.category} className="">
                            {post.category}
                          </a>
                        </div>
                        <h5 className="fw-5">
                          <a href={post.link}>{post.title}</a>
                        </h5>
                        <div className="meta">
                          <div className="meta-item">
                            <i className="flaticon-calendar" />
                            <p>{post.date}</p>
                          </div>
                          <div className="meta-item">
                            <i className="flaticon-message" />
                            <p>{post.commentsCount}</p>
                          </div>
                          <a href={post.authorLink} className="meta-item">
                            <i className="flaticon-user-1" />
                            <p>{post.author}</p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default PostList
