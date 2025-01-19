import React from 'react'

const BlogDetailSharePost = () => {
  return (
    <div className="bottom flex flex-wrap items-center justify-between gap-20">
      <div className="share gap-20p flex items-center">
        <h6 className="fw-5">Share this post</h6>
        <ul className="tf-social-icon flex items-center gap-10">
          <li>
            <a href="#">
              <i className="flaticon-facebook-1"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="icon-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="flaticon-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="flaticon-linkedin-1"></i>
            </a>
          </li>
        </ul>
      </div>
      <ul className="tags-list">
        <li>
          <a href="#" className="tags-item">
            Course
          </a>
        </li>
        <li>
          <a href="#" className="tags-item">
            SEO
          </a>
        </li>
        <li>
          <a href="#" className="tags-item">
            Designer
          </a>
        </li>
        <li>
          <a href="#" className="tags-item">
            Software
          </a>
        </li>
      </ul>
    </div>
  )
}

export default BlogDetailSharePost
