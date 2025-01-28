import React from 'react'

import CoursesList from './_components/courses-list'
import SearchAndSort from './_components/search-and-sort'
import SummaryCards from './_components/summary-cards'

const MeDashBoard = () => {
  return (
    <div>
      <div className="section-dashboard-right">
        <SummaryCards />
        <section className="section-right">
          <SearchAndSort />
          <div className="row">
            <div className="widget-tabs style-small">
              <ul className="widget-menu-tab pd-40 overflow-x-auto">
                <li className="item-title active">Enrolled Courses</li>
                <li className="item-title" data-wow-delay="0.1s">
                  Active Courses
                </li>
                <li className="item-title" data-wow-delay="0.2s">
                  Completed Courses
                </li>
              </ul>
              <div className="widget-content-tab">
                {/* <div className="widget-content-inner active">
                  <div className="row">
                    <div className="col-xl-4">
                      <div
                        className="course-item hover-img wow fadeInUp"
                        data-wow-delay="0.1s"
                      >
                        <div className="features image-wrap">
                          <img
                            className="lazyload"
                            data-src="/assets/images/courses/courses-01.jpg"
                            src="/assets/images/courses/courses-01.jpg"
                            alt=""
                          />

                          <div className="box-wishlist tf-action-btns">
                            <i className="flaticon-heart"></i>
                          </div>
                        </div>
                        <div className="content">
                          <div className="meta">
                            <div className="meta-item">
                              <i className="flaticon-calendar"></i>
                              <p>11666 Lessons</p>
                            </div>
                            <div className="meta-item">
                              <i className="flaticon-clock"></i>
                              <p>16 hours</p>
                            </div>
                          </div>
                          <h6 className="fw-5 line-clamp-2">
                            <a href="course-single-v5.html">
                              Become a Certified Web Developer: HTML, CSS and
                              JavaScript
                            </a>
                          </h6>
                          <div className="ratings pb-30">
                            <div className="number">4.9</div>
                            <i className="icon-star-1"></i>
                            <i className="icon-star-1"></i>
                            <i className="icon-star-1"></i>
                            <i className="icon-star-1"></i>
                            <svg
                              width="12"
                              height="11"
                              viewBox="0 0 12 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                                stroke="#131836"
                              ></path>
                            </svg>
                            <div className="total">(230)</div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar">
                              <div
                                aria-valuenow={80}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
                            </div>
                          </div>
                          <div className="exam-progress">
                            <span className="fw-5 fs-15">Complete</span>
                            <span className="fw-5 fs-15">80%</span>
                          </div>
                          <a href="#" className="tf-btn style-third w-100">
                            Download Certificate{' '}
                            <i className="icon-arrow-top-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <CoursesList />
              </div>
              <ul className="wg-pagination justify-center">
                <li>
                  <a href="#">
                    <i className="icon-arrow-left"></i>
                  </a>
                </li>
                <li>
                  <a href="#">1</a>
                </li>
                <li className="active">
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">...</a>
                </li>
                <li>
                  <a href="#">20</a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-arrow-right"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MeDashBoard
