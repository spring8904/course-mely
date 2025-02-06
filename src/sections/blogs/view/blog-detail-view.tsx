import React from 'react'

import BlogDetailPost from '../_components/blog-detail/post'
import BlogDetailProfileItem from '../_components/blog-detail/profile-item'
import BlogDetailReviewForm from '../_components/blog-detail/review-form'
import BlogDetailReviewList from '../_components/blog-detail/review-list'
import BlogDetailSharePost from '../_components/blog-detail/share-post'
import BlogDetailSimilarPosts from '../_components/blog-detail/similar-posts'

const BlogDetailView = ({ slug }: { slug: string }) => {
  console.log(slug)
  return (
    <div>
      <section className="tf-spacing tf-spacing-3">
        <div className="page-blog-single">
          <div className="image-head">
            <img
              className="w-100 lazyload"
              data-src="/assets/images/blog/blog-detail.jpg"
              src="/assets/images/blog/blog-detail.jpg"
              alt=""
            />
          </div>
          <div className="blog-single-wrap">
            <BlogDetailPost />
            <BlogDetailSharePost />
            <BlogDetailProfileItem />
            <div className="post-control flex flex-wrap items-center justify-between gap-20">
              <div className="prev wow fadeInLeft">
                <a href="#" className="fw-5 h6 flex items-center">
                  <i className="icon-arrow-left"></i>
                  Previous Post
                </a>
                <div className="fs-15">
                  Given Set was without from god divide rule Hath
                </div>
              </div>
              <div className="next wow fadeInRight">
                <a href="#" className="fw-5 h6 flex items-center justify-end">
                  Next Post
                  <i className="icon-arrow-right"></i>
                </a>
                <div className="fs-15">
                  Tree earth fowl given moveth deep lesser After
                </div>
              </div>
            </div>
            <BlogDetailReviewList />
            <div className="add-review-wrap">
              <BlogDetailReviewForm />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- blog --> */}
      <section className="tf-spacing tf-spacing-1 pt-0">
        <BlogDetailSimilarPosts />
      </section>
      {/* <!-- /blog --> */}
    </div>
  )
}

export default BlogDetailView
