import React from 'react'

const StudentBanner = () => {
  return (
    <div className="page-title style-9 bg-5">
      <div className="tf-container">
        <div className="row items-center">
          <div className="col-lg-8">
            <div className="content">
              <div className="author-item">
                <div className="author-item-img">
                  <img src="/assets/images/avatar/review-1.png" alt="" />
                </div>
              </div>
              <div className="title">
                <h2 className="font-cardo fw-7 mb-20">Welcome, Ali Tufan</h2>
                <ul className="entry-meta my-4">
                  <li>
                    <i className="flaticon-book"></i>5 Courses Enroled
                  </li>
                  <li>
                    <i className="flaticon-medal"></i>4 Certificate
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="right-content">
              <a className="tf-btn" href="become-teacher.html">
                Become an Instructor<i className="icon-arrow-top-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentBanner
