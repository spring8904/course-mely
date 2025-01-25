'use client'

import { useState } from 'react'
import MeBanner from '../_components/me-banner'
import MeSideBar from '../_components/me-sidebar'

const MeView = () => {
  const [content, setContent] = useState<React.ReactNode>(null)
  return (
    <div>
      <MeBanner />
      <div className="main-content pt-0">
        <div className="page-inner tf-spacing-1">
          <div className="tf-container">
            <div className="row">
              <div className="col-xl-3">
                {/* <div className="dashboard_navigationbar">
                  <div className="dropbtn">
                    <i className="icon-home"></i> Dashboard Navigation
                  </div>
                  <div className="instructors-dashboard">
                    <div className="dashboard-title">STUDENT DASHBOARD</div>
                    <a
                      className="dashboard-item active"
                      href="student-dashboard.html"
                    >
                      <i className="flaticon-activity"></i>
                      Dashboard
                    </a>
                    <a
                      className="dashboard-item"
                      href="student-my-courses.html"
                    >
                      <i className="flaticon-play-1"></i>
                      My Courses
                    </a>
                    <a className="dashboard-item" href="student-reviews.html">
                      <i className="flaticon-message-1"></i>
                      Reviews
                    </a>
                    <a className="dashboard-item" href="student-wishlist.html">
                      <i className="flaticon-heart"></i>
                      Wishlist
                    </a>
                    <a className="dashboard-item" href="student-quizzes.html">
                      <i className="flaticon-question"></i>
                      Quizzes
                    </a>
                    <a className="dashboard-item" href="student-order.html">
                      <i className="flaticon-bag"></i>
                      Order
                    </a>
                    <a className="dashboard-item" href="student-setting.html">
                      <i className="flaticon-setting-1"></i>
                      Settings
                    </a>
                    <a className="dashboard-item" href="index.html">
                      <i className="flaticon-export"></i>
                      Logout
                    </a>
                  </div>
                </div> */}
                <MeSideBar
                  onSelect={(component) => {
                    setContent(component)
                  }}
                />
              </div>
              <div className="col-xl-9">
                <div>{content || <div>lỗi rùi hehe</div>}</div>
                {/* <div className="section-dashboard-right">
                  <section className="section-icons">
                    <div className="row">
                      <div className="icons-items">
                        <div className="icons-box style-4 wow fadeInUp">
                          <div className="icons">
                            <i className="flaticon-play-2"></i>
                          </div>
                          <div className="content">
                            <h6>Total Course</h6>
                            <span className="num-count fs-26 fw-5">90</span>
                          </div>
                        </div>
                        <div
                          className="icons-box style-4 wow fadeInUp"
                          data-wow-delay="0.1s"
                        >
                          <div className="icons">
                            <i className="flaticon-alarm"></i>
                          </div>
                          <div className="content">
                            <h6>Published Course</h6>
                            <span className="num-count fs-26 fw-5">28</span>
                          </div>
                        </div>
                        <div
                          className="icons-box style-4 wow fadeInUp"
                          data-wow-delay="0.2s"
                        >
                          <div className="icons">
                            <i className="flaticon-video"></i>
                          </div>
                          <div className="content">
                            <h6>Pending Course</h6>
                            <span className="num-count fs-26 fw-5">45</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="section-right">
                    <div className="row">
                      <div className="pd-40 flex items-center filter">
                        <div className="header-search wow fadeInUp flex-grow">
                          <form action="#" className="form-search">
                            <fieldset>
                              <input
                                className=""
                                type="text"
                                placeholder="Search for anything"
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
                        <div className="sort-by-wrap">
                          <div className="sort-wrap">
                            <p
                              className="text text-2 wow fadeInUp"
                              data-wow-delay="0.1s"
                            >
                              Sort by
                            </p>
                            <div
                              className="nice-select default wow fadeInUp"
                              data-wow-delay="0.1s"
                              tabIndex={0}
                            >
                              <span className="current text text-1">
                                Date Created
                              </span>
                              <ul className="list">
                                <li
                                  data-value
                                  className="option selected text text-1"
                                >
                                  Date Created
                                </li>
                                <li
                                  data-value="For Ren"
                                  className="option text text-1"
                                >
                                  Oldest
                                </li>
                                <li
                                  data-value="Sold"
                                  className="option text text-1"
                                >
                                  3 days
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="widget-tabs style-small">
                        <ul className="widget-menu-tab pd-40 overflow-x-auto">
                          <li className="item-title active">
                            Enrolled Courses
                          </li>
                          <li className="item-title" data-wow-delay="0.1s">
                            Active Courses
                          </li>
                          <li className="item-title" data-wow-delay="0.2s">
                            Completed Courses
                          </li>
                        </ul>
                        <div className="widget-content-tab">
                          <div className="widget-content-inner active">
                            <div className="row">
                              <div className="col-xl-4">
                                <div className="course-item hover-img wow fadeInUp">
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div
                                  className="course-item hover-img wow fadeInUp"
                                  data-wow-delay="0.1s"
                                >
                                  <div className="features image-wrap">
                                    <img
                                      className="lazyload"
                                      data-src="/assets/images/courses/courses-02.jpg"
                                      src="/assets/images/courses/courses-02.jpg"
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div
                                  className="course-item hover-img wow fadeInUp"
                                  data-wow-delay="0.2s"
                                >
                                  <div className="features image-wrap">
                                    <img
                                      className="lazyload"
                                      data-src="/assets/images/courses/courses-03.jpg"
                                      src="/assets/images/courses/courses-03.jpg"
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div className="course-item hover-img wow fadeInUp">
                                  <div className="features image-wrap">
                                    <img
                                      className="lazyload"
                                      data-src="/assets/images/courses/courses-09.jpg"
                                      src="/assets/images/courses/courses-09.jpg"
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div
                                  className="course-item hover-img wow fadeInUp"
                                  data-wow-delay="0.1s"
                                >
                                  <div className="features image-wrap">
                                    <img
                                      className="lazyload"
                                      data-src="/assets/images/courses/courses-24.jpg"
                                      src="/assets/images/courses/courses-24.jpg"
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div
                                  className="course-item hover-img wow fadeInUp"
                                  data-wow-delay="0.2s"
                                >
                                  <div className="features image-wrap">
                                    <img
                                      className="lazyload"
                                      data-src="/assets/images/courses/courses-23.jpg"
                                      src="/assets/images/courses/courses-23.jpg"
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="widget-content-inner">
                            <div className="row">
                              <div className="col-xl-4">
                                <div className="course-item hover-img">
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div className="course-item hover-img">
                                  <div className="features image-wrap">
                                    <img
                                      className="lazyload"
                                      data-src="/assets/images/courses/courses-02.jpg"
                                      src="/assets/images/courses/courses-02.jpg"
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div className="course-item hover-img">
                                  <div className="features image-wrap">
                                    <img
                                      className="lazyload"
                                      data-src="/assets/images/courses/courses-03.jpg"
                                      src="/assets/images/courses/courses-03.jpg"
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div className="course-item hover-img">
                                  <div className="features image-wrap">
                                    <img
                                      className="lazyload"
                                      data-src="/assets/images/courses/courses-09.jpg"
                                      src="/assets/images/courses/courses-09.jpg"
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div className="course-item hover-img">
                                  <div className="features image-wrap">
                                    <img
                                      className="lazyload"
                                      data-src="/assets/images/courses/courses-24.jpg"
                                      src="/assets/images/courses/courses-24.jpg"
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div className="course-item hover-img">
                                  <div className="features image-wrap">
                                    <img
                                      className="lazyload"
                                      data-src="/assets/images/courses/courses-23.jpg"
                                      src="/assets/images/courses/courses-23.jpg"
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="widget-content-inner">
                            <div className="row">
                              <div className="col-xl-4">
                                <div className="course-item hover-img">
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div className="course-item hover-img">
                                  <div className="features image-wrap">
                                    <img
                                      className="lazyload"
                                      data-src="/assets/images/courses/courses-02.jpg"
                                      src="/assets/images/courses/courses-02.jpg"
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div className="course-item hover-img">
                                  <div className="features image-wrap">
                                    <img
                                      className="lazyload"
                                      data-src="/assets/images/courses/courses-03.jpg"
                                      src="/assets/images/courses/courses-03.jpg"
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div className="course-item hover-img">
                                  <div className="features image-wrap">
                                    <img
                                      className="lazyload"
                                      data-src="/assets/images/courses/courses-09.jpg"
                                      src="/assets/images/courses/courses-09.jpg"
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div className="course-item hover-img">
                                  <div className="features image-wrap">
                                    <img
                                      className="lazyload"
                                      data-src="/assets/images/courses/courses-24.jpg"
                                      src="/assets/images/courses/courses-24.jpg"
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div className="course-item hover-img">
                                  <div className="features image-wrap">
                                    <img
                                      className="lazyload"
                                      data-src="/assets/images/courses/courses-23.jpg"
                                      src="/assets/images/courses/courses-23.jpg"
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
                                        <p>11 Lessons</p>
                                      </div>
                                      <div className="meta-item">
                                        <i className="flaticon-clock"></i>
                                        <p>16 hours</p>
                                      </div>
                                    </div>
                                    <h6 className="fw-5 line-clamp-2">
                                      <a href="course-single-v5.html">
                                        Become a Certified Web Developer: HTML,
                                        CSS and JavaScript
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
                                      <span className="fw-5 fs-15">
                                        Complete
                                      </span>
                                      <span className="fw-5 fs-15">80%</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="tf-btn style-third w-100"
                                    >
                                      Download Certificate{' '}
                                      <i className="icon-arrow-top-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeView
