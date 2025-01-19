import React from 'react'

const BlogListBanner = () => {
  return (
    <div className="page-title basic">
      <div className="tf-container full">
        <div className="row">
          <div className="col-12">
            <div className="content text-center">
              <ul className="breadcrumbs flex items-center justify-center gap-10">
                <li>
                  <a href="index.html" className="flex">
                    <i className="icon-home"></i>
                  </a>
                </li>
                <li>
                  <i className="icon-arrow-right"></i>
                </li>
                <li>Pages</li>
                <li>
                  <i className="icon-arrow-right"></i>
                </li>
                <li>Shop</li>
              </ul>
              <h2 className="font-cardo fw-7">Blog Grid</h2>
              <h6>
                Products that help beginner designers become true unicorns.
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogListBanner
