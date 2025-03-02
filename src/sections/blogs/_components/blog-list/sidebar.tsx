import React from 'react'
import Image from 'next/image'

const BlogListSideBar = () => {
  return (
    <div className="right tf-sidebar">
      <div className="sidebar-search">
        <form action="#" className="form-search">
          <fieldset>
            <input
              className=""
              type="text"
              placeholder="Search"
              name="text"
              tabIndex={2}
              value=""
              aria-required="true"
              required
            />
          </fieldset>
          <div className="button-submit">
            <button className="" type="submit">
              <i className="icon-search fs-20"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="sidebar-item sidebar-categories tf-collapse-item">
        <div className="sidebar-title tf-collapse-title">
          <h5 className="fw-5">Categories</h5>
          <i className="tf-collapse-icon icon-arrow-top"></i>
        </div>
        <ul className="tf-collapse-content">
          <li className="flex items-center justify-between">
            <a href="#" className="fs-15">
              Web Development
            </a>
            <div className="number">(432)</div>
          </li>
          <li className="flex items-center justify-between">
            <a href="#" className="fs-15">
              Software Testing
            </a>
            <div className="number">(12)</div>
          </li>
          <li className="flex items-center justify-between">
            <a href="#" className="fs-15">
              Mobile Development
            </a>
            <div className="number">(324)</div>
          </li>
          <li className="flex items-center justify-between">
            <a href="#" className="fs-15">
              Game Development
            </a>
            <div className="number">(87)</div>
          </li>
          <li className="flex items-center justify-between">
            <a href="#" className="fs-15">
              Software Engineering
            </a>
            <div className="number">(163)</div>
          </li>
        </ul>
      </div>
      <div className="sidebar-item sidebar-recent tf-collapse-item pb-36">
        <div className="sidebar-title tf-collapse-title">
          <h5 className="fw-5">Recent Posts</h5>
          <i className="tf-collapse-icon icon-arrow-top"></i>
        </div>
        <ul className="tf-collapse-content">
          <li className="recent-item hover-img">
            <div className="image image-wrap">
              <Image
                layout="fill"
                className="lazyload"
                data-src="/assets/images/blog/blog-05.jpg"
                src="/assets/images/blog/blog-05.jpg"
                alt=""
              />
            </div>
            <div className="content">
              <div className="text-15 fw-5">
                <a href="blog-single.html">Why Is Education So Famous?</a>
              </div>
              <p>06 April 2024</p>
            </div>
          </li>
          <li className="recent-item hover-img">
            <div className="image image-wrap">
              <img
                className="lazyload"
                data-src="/assets/images/blog/blog-12.jpg"
                src="/assets/images/blog/blog-12.jpg"
                alt=""
              />
            </div>
            <div className="content">
              <div className="text-15 fw-5">
                <a href="blog-single.html">Difficult Things About Education.</a>
              </div>
              <p>06 April 2024</p>
            </div>
          </li>
          <li className="recent-item hover-img">
            <div className="image image-wrap">
              <img
                className="lazyload"
                data-src="/assets/images/blog/blog-03.jpg"
                src="/assets/images/blog/blog-03.jpg"
                alt=""
              />
            </div>
            <div className="content">
              <div className="text-15 fw-5">
                <a href="blog-single.html">Why Is Education So Famous?</a>
              </div>
              <p>06 April 2024</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="sidebar-item tf-collapse-item">
        <div className="sidebar-title tf-collapse-title">
          <h5 className="fw-5">Tags</h5>
          <i className="tf-collapse-icon icon-arrow-top"></i>
        </div>
        <div className="tf-collapse-content">
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
            <li>
              <a href="#" className="tags-item">
                Java
              </a>
            </li>
            <li>
              <a href="#" className="tags-item">
                CSS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BlogListSideBar
