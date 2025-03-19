import Link from 'next/link'

const BlogDetailSimilarPosts = () => {
  return (
    <div className="tf-container">
      <div className="row">
        <div className="col-12">
          <div className="heading-section">
            <h2 className="fw-7 wow fadeInUp">Bài viết tương tự</h2>
            <div className="flex flex-wrap items-center justify-between gap-[10px]">
              <div className="sub fs-15 wow fadeInUp">
                Những bài viết hay sẽ mở mang tri thức cho bạn.
              </div>
              <Link
                href="/blogs"
                className="tf-btn-arrow wow fadeInUp"
                data-wow-delay="0.1s"
              >
                Xem tất cả bài viết <i className="icon-arrow-top-right"></i>
              </Link>
            </div>
          </div>
          <div
            className="swiper-container tf-sw-mobile"
            data-preview="5"
            data-space="28"
          >
            <div className="swiper-wrapper grid-sw-4">
              <div className="swiper-slide">
                <div className="blog-article-item hover-img wow fadeInUp">
                  <div className="article-thumb image-wrap">
                    <img
                      // layout="fill"
                      className="lazyload"
                      src=""
                      alt=""
                    />
                  </div>
                  <div className="article-content">
                    <div className="article-label">
                      <a href="blog-single.html" className="">
                        Development
                      </a>
                    </div>
                    <h5 className="fw-5">
                      <a href="blog-single.html">
                        The Technical Certifications That Matter Most for the
                        Future
                      </a>
                    </h5>
                    <div className="meta">
                      <div className="meta-item">
                        <i className="flaticon-calendar"></i>
                        <p>06 April 2024</p>
                      </div>
                      <div className="meta-item">
                        <i className="flaticon-message"></i>
                        <p>14</p>
                      </div>
                      <a href="#" className="meta-item">
                        <i className="flaticon-user-1"></i>
                        <p>Esther Howard</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div
                  className="blog-article-item hover-img wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="article-thumb image-wrap">
                    <img
                      className="lazyload"
                      data-src="/assets/images/blog/blog-02.jpg"
                      src="/assets/images/blog/blog-02.jpg"
                      alt=""
                    />
                  </div>
                  <div className="article-content">
                    <div className="article-label">
                      <a href="blog-single.html" className="">
                        Development
                      </a>
                    </div>
                    <h5 className="fw-5">
                      <a href="blog-single.html">
                        How to Become a Web Designer: A Comprehensive Guide
                      </a>
                    </h5>
                    <div className="meta">
                      <div className="meta-item">
                        <i className="flaticon-calendar"></i>
                        <p>06 April 2024</p>
                      </div>
                      <div className="meta-item">
                        <i className="flaticon-message"></i>
                        <p>14</p>
                      </div>
                      <a href="#" className="meta-item">
                        <i className="flaticon-user-1"></i>
                        <p>Floyd Miles</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div
                  className="blog-article-item hover-img wow fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="article-thumb image-wrap">
                    <img
                      className="lazyload"
                      data-src="/assets/images/blog/blog-03.jpg"
                      src="/assets/images/blog/blog-03.jpg"
                      alt=""
                    />
                  </div>
                  <div className="article-content">
                    <div className="article-label">
                      <a href="blog-single.html" className="">
                        Development
                      </a>
                    </div>
                    <h5 className="fw-5">
                      <a href="blog-single.html">
                        How To Use Business Analysis Tools To Gain an Edge
                      </a>
                    </h5>
                    <div className="meta">
                      <div className="meta-item">
                        <i className="flaticon-calendar"></i>
                        <p>06 April 2024</p>
                      </div>
                      <div className="meta-item">
                        <i className="flaticon-message"></i>
                        <p>14</p>
                      </div>
                      <a href="#" className="meta-item">
                        <i className="flaticon-user-1"></i>
                        <p>Marvin McKinney</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div
                  className="blog-article-item hover-img wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="article-thumb image-wrap">
                    <img
                      className="lazyload"
                      data-src="/assets/images/blog/blog-04.jpg"
                      src="/assets/images/blog/blog-04.jpg"
                      alt=""
                    />
                  </div>
                  <div className="article-content">
                    <div className="article-label">
                      <a href="blog-single.html" className="">
                        Development
                      </a>
                    </div>
                    <h5 className="fw-5">
                      <a href="blog-single.html">
                        It’s Time To Think Differently About Writing In The
                        ClassNameroom
                      </a>
                    </h5>
                    <div className="meta">
                      <div className="meta-item">
                        <i className="flaticon-calendar"></i>
                        <p>06 April 2024</p>
                      </div>
                      <div className="meta-item">
                        <i className="flaticon-message"></i>
                        <p>14</p>
                      </div>
                      <a href="#" className="meta-item">
                        <i className="flaticon-user-1"></i>
                        <p>Albert Flores</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailSimilarPosts
