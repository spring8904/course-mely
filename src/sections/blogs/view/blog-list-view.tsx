import React from 'react'
import BlogListBanner from '../_components/blog-list/banner'
import BlogListItem from '../_components/blog-list/item'
import BlogListPagination from '../_components/blog-list/pagination'
import BlogListSideBar from '../_components/blog-list/sidebar'

const BlogListView = () => {
  return (
    <div>
      {/* <!-- page-title --> */}
      <BlogListBanner />
      {/* <!-- /page-title -->

  <!-- page-blog-grid --> */}
      <section className="tf-spacing tf-spacing-1">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="page-blog-list">
                {/* post */}
                <div className="left">
                  <BlogListItem />
                  <BlogListPagination />
                </div>
                {/* Side bar*/}
                <BlogListSideBar />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /page-blog-grid --> */}
    </div>
  )
}

export default BlogListView
