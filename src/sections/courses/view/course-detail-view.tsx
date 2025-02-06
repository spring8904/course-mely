import React from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  chapterData,
  courseData,
  lessonData,
} from '@/sections/courses/data/data'

const courses = [
  {
    id: 1,
    image: '/assets/images/courses/courses-01.jpg',
    title: 'Become a Certified Web Developer: HTML, CSS and JavaScript',
    lessons: '11 Lessons',
    hours: '16 hours',
    rating: 4.9,
    totalReviews: 230,
    author: 'Carolyn Welborn',
    price: '$89.29',
  },
  {
    id: 2,
    image: '/assets/images/courses/courses-02.jpg',
    title: 'Advanced Python Programming: Mastering Python 3',
    lessons: '15 Lessons',
    hours: '20 hours',
    rating: 4.7,
    totalReviews: 150,
    author: 'James Smith',
    price: '$79.99',
  },
]

const CourseDetailView = ({ slug }: { slug: string }) => {
  console.log(slug)

  const benefitsCoulumn1 = courseData.benefits?.slice(
    0,
    Math.ceil(courseData.benefits.length / 2)
  )
  const benefitsCoulumn2 = courseData.benefits?.slice(
    Math.ceil(courseData.benefits.length / 2)
  )

  return (
    <div className="main-content pt-0">
      <section className="section-page-title page-title style-5">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-8">
              <div className="content">
                <ul className="breadcrumbs mb-60 flex items-center justify-start gap-10">
                  <li>
                    <Link href="/" className="flex">
                      <i className="icon-home" />
                    </Link>
                  </li>
                  <li>
                    <i className="icon-arrow-right" />
                  </li>
                  <li>Khoá học</li>
                  <li>
                    <i className="icon-arrow-right" />
                  </li>
                  <li>Khoá học ReactJS cơ bản cho người mới bắt đầu</li>
                </ul>
                <h2 className="fw-7">
                  Khoá học ReactJS cơ bản cho người mới bắt đầu
                </h2>
                <p className="except">
                  Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học
                  này là bạn có thể làm hầu hết các dự án thường gặp với
                  ReactJS. Cuối khóa học này bạn sẽ sở hữu một dự án giống
                  Tiktok.com, bạn có thể tự tin đi xin việc khi nắm chắc các
                  kiến thức được chia sẻ trong khóa học này.
                </p>
                <ul className="entry-meta">
                  <li>
                    <div className="ratings">
                      <div className="number">4.9</div>
                      <i className="icon-star-1" />
                      <i className="icon-star-1" />
                      <i className="icon-star-1" />
                      <i className="icon-star-1" />
                      <svg
                        width={12}
                        height={11}
                        viewBox="0 0 12 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                          stroke="#131836"
                        />
                      </svg>
                      <p className="total fs-15">315,475 rating</p>
                    </div>
                  </li>
                  <li>
                    <i className="flaticon-book" />
                    <p>11 Lessons</p>
                  </li>
                  <li>
                    <i className="flaticon-user" />
                    <p>229 Students</p>
                  </li>
                  <li>
                    <i className="flaticon-clock" />
                    <p>Last updated 12/2024</p>
                  </li>
                </ul>
                <div className="author-item">
                  <div className="author-item-img">
                    <img src="/assets/images/avatar/review-1.png" alt="" />
                  </div>
                  <div className="text">
                    <span className="text-1">By </span>
                    <a href="#">Theresa Edin</a>
                    <span className="text-1 mx-2">In</span>
                    <a href="#">Development</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /section page title */}
      {/*section page inner*/}
      <section className="section-page-course">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-8">
              <div className="course-single-inner">
                <div className="page-learn">
                  <h2
                    className="learn-head text-22 fw-5 wow fadeInUp"
                    data-wow-delay="0s"
                  >
                    Bạn sẽ học được gì?
                  </h2>
                  <div className="learn-inner">
                    <ul className="learn-list">
                      {benefitsCoulumn1?.map((benefit, index) => (
                        <li key={index} className="item">
                          <i className="flaticon-check" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <ul className="learn-list">
                      {benefitsCoulumn2?.map((benefit, index) => (
                        <li key={index} className="item">
                          <i className="flaticon-check" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="page-learn">
                  <h2 className="text-22 fw-5 wow fadeInUp" data-wow-delay="0s">
                    Yêu cầu
                  </h2>
                  <div className="learn-inner">
                    <ul className="learn-list">
                      {benefitsCoulumn1?.map((benefit, index) => (
                        <li key={index} className="item">
                          <i className="flaticon-check" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <ul className="learn-list">
                      {benefitsCoulumn2?.map((benefit, index) => (
                        <li key={index} className="item">
                          <i className="flaticon-check" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="page-course-content">
                  <h2 className="text-22 fw-5 wow fadeInUp" data-wow-delay="0s">
                    Nội dung khoá học
                  </h2>
                  {chapterData?.map((chapter, chapterIndex) => (
                    <Accordion
                      type="single"
                      collapsible
                      key={chapterIndex}
                      className="mb-6"
                    >
                      <AccordionItem value={`item-${chapter.id}`}>
                        <AccordionTrigger className="rounded-lg p-4 text-2xl">
                          {chapter.title}
                        </AccordionTrigger>
                        <AccordionContent className="rounded-lg">
                          {lessonData
                            ?.filter(
                              (lesson) => lesson.chapterId === chapter.id
                            )
                            .map((lesson, lessonIndex) => (
                              <div
                                className="mb-3 flex items-center gap-2 pb-2 text-2xl font-medium"
                                key={lessonIndex}
                              >
                                <i className="flaticon-play-1" />
                                {lesson.content}
                                <span className="ml-auto shrink-0 text-xl font-semibold">
                                  0 phút
                                </span>
                              </div>
                            ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </div>
                <div className="page-instructor">
                  <h2 className="text-22 fw-5 wow fadeInUp" data-wow-delay="0s">
                    Người hướng dẫn
                  </h2>
                  <div className="instructors-item style-2">
                    <div className="image-wrapper">
                      <img
                        className="lazyload"
                        data-src="/assets/images/instructors/instructors-01.jpg"
                        src="/assets/images/instructors/instructors-01.jpg"
                        alt=""
                      />
                    </div>
                    <div className="entry-content">
                      <h5 className="entry-title">
                        <a href="#">Trương Văn Tùng</a>
                      </h5>
                      <p className="short-description">FrontEnd Developer</p>
                      <ul className="entry-meta">
                        <li>
                          <div className="ratings">
                            <div className="number">4.9</div>
                            <i className="icon-star-1" />
                            <i className="icon-star-1" />
                            <i className="icon-star-1" />
                            <i className="icon-star-1" />
                            <svg
                              width={12}
                              height={11}
                              viewBox="0 0 12 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                                stroke="#131836"
                              />
                            </svg>
                            <div className="total">315,475 Reviews</div>
                          </div>
                        </li>
                        <li>
                          <i className="flaticon-user" />
                          345 Students
                        </li>
                        <li>
                          <i className="flaticon-play" />
                          34 Course
                        </li>
                      </ul>
                      <p className="description">
                        Lorem ipsum dolor sit amet. Qui incidunt dolores non
                        similique ducimus et debitis molestiae. Et autem quia
                        eum reprehenderit voluptates est reprehenderit illo est
                        enim perferendis est neque sunt.{' '}
                      </p>
                      <ul className="tf-social-icon flex items-center gap-10">
                        <li>
                          <a href="#">
                            <i className="flaticon-facebook-1" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="icon-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="flaticon-instagram" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="flaticon-linkedin-1" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="page-my-course">
                  <div className="heading-section">
                    <h6
                      className="fw-5 text-22 wow fadeInUp"
                      data-wow-delay="0s"
                    >
                      Khoá học khác của Trương Văn Tùng
                    </h6>
                  </div>
                  <div className="swiper-container">
                    <Swiper spaceBetween={25} slidesPerView={3}>
                      {courses.map((course, index) => (
                        <SwiperSlide key={index}>
                          <div className="course-item hover-img title-small">
                            <div className="features image-wrap">
                              <img
                                className="ls-is-cached lazyloaded"
                                src={course.image}
                                alt={course.title}
                              />
                              <div className="box-tags">
                                <a href="#" className="item best-seller">
                                  Best Seller
                                </a>
                              </div>
                              <div className="box-wishlist tf-action-btns">
                                <i className="flaticon-heart" />
                              </div>
                            </div>
                            <div className="content">
                              <div className="meta">
                                <div className="meta-item">
                                  <i className="flaticon-calendar" />
                                  <p>{course.lessons}</p>
                                </div>
                                <div className="meta-item">
                                  <i className="flaticon-clock" />
                                  <p>{course.hours}</p>
                                </div>
                              </div>
                              <h6 className="fw-5 line-clamp-2">
                                <a href="#">{course.title}</a>
                              </h6>
                              <div className="ratings pb-30">
                                <div className="number">{course.rating}</div>
                                {[...Array(5)].map((_, i) => (
                                  <i
                                    key={i}
                                    className={`icon-star-1 ${i < Math.floor(course.rating) ? 'filled' : ''}`}
                                  />
                                ))}
                                <div className="total">
                                  ({course.totalReviews})
                                </div>
                              </div>
                              <div className="author">
                                By:
                                <a href="#" className="author">
                                  {course.author}
                                </a>
                              </div>
                              <div className="bottom">
                                <div className="h6 price fw-5">
                                  {course.price}
                                </div>
                                <a href="#" className="tf-btn-arrow">
                                  <span className="fw-5 fs-15">
                                    Enroll Course
                                  </span>
                                  <i className="icon-arrow-top-right" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
                <div className="review-wrap">
                  <div className="review-title flex items-center justify-between">
                    <div
                      className="text-22 fw-5 wow fadeInUp"
                      data-wow-delay="0s"
                    >
                      Đánh giá
                    </div>
                    <div
                      className="review-rating wow fadeInUp"
                      data-wow-delay="0.1s"
                    >
                      <div className="course-rating">
                        <i className="icon-star-1" />
                        <div className="fs-15">4.9 course rating</div>
                      </div>
                      <div className="rating relative">
                        <div className="fs-15">4K ratings</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="review-item">
                      <div className="avatar">
                        <img
                          className="ls-is-cached lazyloaded"
                          data-src="/assets/images/avatar/review-1.png"
                          src="/assets/images/avatar/review-1.png"
                          alt=""
                        />
                      </div>
                      <div className="comment-box">
                        <h5 className="author-name">
                          {' '}
                          <a href="#">Theresa Edin</a>
                        </h5>
                        <div className="ratings">
                          <div className="number">4.9</div>
                          <i className="icon-star-1" />
                          <i className="icon-star-1" />
                          <i className="icon-star-1" />
                          <i className="icon-star-1" />
                          <svg
                            width={12}
                            height={11}
                            viewBox="0 0 12 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                              stroke="#131836"
                            />
                          </svg>
                          <div className="total">2 months ago</div>
                        </div>
                        <p className="evaluate">Excellent Course</p>
                        <p className="comment">
                          Lorem ipsum dolor sit amet. Qui incidunt dolores non
                          similique ducimus et debitis molestiae. Et autem quia
                          eum reprehenderit voluptates est reprehenderit illo
                          est enim perferendis est neque sunt.{' '}
                        </p>
                        <ul className="reaction">
                          <li className="btn-like">
                            <i className="icon-like" />
                            Helpful
                          </li>
                          <li className="btn-dislike">
                            <i className="icon-dislike" />
                            Not helpful
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="review-item">
                      <div className="avatar">
                        <img
                          className="ls-is-cached lazyloaded"
                          data-src="/assets/images/avatar/review-2.png"
                          src="/assets/images/avatar/review-2.png"
                          alt=""
                        />
                      </div>
                      <div className="comment-box">
                        <h5 className="author-name">
                          {' '}
                          <a href="#">Theresa Edin</a>
                        </h5>
                        <div className="ratings">
                          <div className="number">4.9</div>
                          <i className="icon-star-1" />
                          <i className="icon-star-1" />
                          <i className="icon-star-1" />
                          <i className="icon-star-1" />
                          <svg
                            width={12}
                            height={11}
                            viewBox="0 0 12 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                              stroke="#131836"
                            />
                          </svg>
                          <div className="total">2 months ago</div>
                        </div>
                        <p className="evaluate">Excellent Course</p>
                        <p className="comment">
                          Lorem ipsum dolor sit amet. Qui incidunt dolores non
                          similique ducimus et debitis molestiae. Et autem quia
                          eum reprehenderit voluptates est reprehenderit illo
                          est enim perferendis est neque sunt.{' '}
                        </p>
                        <ul className="reaction">
                          <li className="btn-like">
                            <i className="icon-like" />
                            Helpful
                          </li>
                          <li className="btn-dislike">
                            <i className="icon-dislike" />
                            Not helpful
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <a href="#" className="tf-btn style-third w-100">
                    View More Reviews
                    <i className="icon-arrow-top-right" />
                  </a>
                </div>
                <div className="add-review-wrap">
                  <div className="add-review-title text-22 fw-5">
                    Leave A Reply
                  </div>
                  <p className="fs-15">
                    Your email address will not be published.&nbsp;Required
                    fields are marked&nbsp;*
                  </p>
                  <div className="ratings">
                    <h6 className="fw-5">Ratings</h6>
                    <i className="icon-star-1" />
                    <i className="icon-star-1" />
                    <i className="icon-star-1" />
                    <i className="icon-star-1" />
                    <svg
                      width={12}
                      height={11}
                      viewBox="0 0 12 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                        stroke="#131836"
                      />
                    </svg>
                  </div>
                  <form action="#" className="form-add-review">
                    <div className="cols">
                      <fieldset className="tf-field">
                        <input
                          className="tf-input style-1"
                          id="field1"
                          type="text"
                          placeholder=""
                          name="text"
                          tabIndex={2}
                          defaultValue=""
                          aria-required="true"
                        />
                        <label
                          className="tf-field-label fs-15"
                          htmlFor="field1"
                        >
                          First Name
                        </label>
                      </fieldset>
                      <fieldset className="tf-field">
                        <input
                          className="tf-input style-1"
                          id="field2"
                          type="email"
                          placeholder=""
                          name="email"
                          tabIndex={2}
                          defaultValue="creativelayers088@gmail.com"
                          aria-required="true"
                        />
                        <label
                          className="tf-field-label fs-15"
                          htmlFor="field2"
                        >
                          Email
                        </label>
                      </fieldset>
                    </div>
                    <div className="cols">
                      <fieldset className="tf-field">
                        <input
                          className="tf-input style-1"
                          id="field3"
                          type="number"
                          placeholder=""
                          name="number"
                          tabIndex={2}
                          defaultValue=""
                          aria-required="true"
                        />
                        <label
                          className="tf-field-label fs-15"
                          htmlFor="field3"
                        >
                          Phone
                        </label>
                      </fieldset>
                      <fieldset className="tf-field">
                        <input
                          className="tf-input style-1"
                          id="field4"
                          type="email"
                          placeholder=""
                          name="email"
                          tabIndex={2}
                          defaultValue=""
                          aria-required="true"
                        />
                        <label
                          className="tf-field-label fs-15"
                          htmlFor="field4"
                        >
                          Title
                        </label>
                      </fieldset>
                    </div>
                    <fieldset className="tf-field">
                      <textarea
                        className="tf-input style-1"
                        name="message"
                        rows={4}
                        placeholder=""
                        tabIndex={2}
                        aria-required="true"
                        defaultValue={''}
                      />
                      <label
                        className="tf-field-label type-textarea fs-15"
                        htmlFor=""
                      >
                        Textarea
                      </label>
                    </fieldset>
                    <div className="checkbox-item">
                      <label>
                        <p className="fs-15">
                          Save my name, email, and website in this browser for
                          the next time I comment.
                        </p>
                        <input type="checkbox" />
                        <span className="btn-checkbox" />
                      </label>
                    </div>
                    <div className="button-submit">
                      <button className="tf-btn w-100" type="submit">
                        Post Comment
                        <i className="icon-arrow-top-right" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sidebar-course course-single-v2">
                <div className="widget-video">
                  <img
                    className="lazyload"
                    data-src="/assets/images/courses/courses-03.jpg"
                    src="/assets/images/courses/courses-03.jpg"
                    alt=""
                  />
                  <a
                    href="https://www.youtube.com/watch?v=MLpWrANjFbI"
                    className="popup-youtube"
                  >
                    <i className="flaticon-play fs-18" />
                  </a>
                </div>
                <div className="sidebar-course-content">
                  <div className="course-price">
                    <div className="price">
                      <h3 className="fw-5">$ 249.00</h3>
                      <h6 className="fs-15">$ 449.00</h6>
                    </div>
                    <p className="sale-off">39% OFF</p>
                  </div>
                  <a className="tf-btn add-to-cart" href="#">
                    Mua khoá học
                    <i className="icon-shopcart fs-18"></i>
                  </a>
                  <div className="course-list">
                    <h5 className="fw-5">Khoá học gồm có:</h5>
                    <ul className="course-benefit-list">
                      <li className="course-benefit-item">
                        <i className="flaticon-play-1" />
                        <p>54.5 hours on-demand video</p>
                      </li>
                      <li className="course-benefit-item">
                        <i className="flaticon-document" />
                        <p>3 articles</p>
                      </li>
                      <li className="course-benefit-item">
                        <i className="flaticon-down-arrow" />
                        <p>249 downloadable resources</p>
                      </li>
                      <li className="course-benefit-item">
                        <i className="flaticon-mobile-phone" />
                        <p>Access on mobile and TV</p>
                      </li>
                      <li className="course-benefit-item">
                        <i className="icon-extremely" />
                        <p>Full lifetime access</p>
                      </li>
                      <li className="course-benefit-item">
                        <i className="flaticon-medal" />
                        <p>Certificate of completion</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="course-social">
                  <h6 className="fw-5">Chia sẻ khoá học đến với mọi người</h6>
                  <ul>
                    <li>
                      <a href="#">
                        <i className="flaticon-facebook-1" />
                      </a>
                    </li>
                    <li className="course-social-item">
                      <a href="#">
                        <i className="icon-twitter" />
                      </a>
                    </li>
                    <li className="course-social-item">
                      <a href="#">
                        <i className="flaticon-instagram" />
                      </a>
                    </li>
                    <li className="course-social-item">
                      <a href="#">
                        <i className="flaticon-linkedin-1" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* / section page inner */}
      {/* section courses*/}
      <section className="tf-spacing-1 section-course pt-0">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="heading-section">
                <h2
                  className="fw-7 font-cardo wow fadeInUp"
                  data-wow-delay="0s"
                >
                  Khoá học có thể phù hợp với bạn
                </h2>
                <div className="flex flex-wrap items-center justify-between gap-10">
                  <div className="sub fs-15 wow fadeInUp" data-wow-delay="0s">
                    Lorem ipsum dolor sit amet elit
                  </div>
                  <a
                    href="blog-grid.html"
                    className="tf-btn-arrow wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    Xem thêm <i className="icon-arrow-top-right" />
                  </a>
                </div>
              </div>
              <div className="swiper-container slider-courses-5">
                <Swiper
                  spaceBetween={25}
                  slidesPerView={4}
                  loop={true}
                  pagination={{
                    clickable: true,
                  }}
                >
                  {courses.map((course) => (
                    <SwiperSlide key={course.id}>
                      <div className="course-item hover-img title-small wow fadeInUp">
                        <div className="features image-wrap">
                          <img
                            className="ls-is-cached lazyloaded"
                            data-src={course.image}
                            src={course.image}
                            alt={course.title}
                          />
                          <div className="box-tags">
                            <a href="#" className="item best-seller">
                              Best Seller
                            </a>
                          </div>
                          <div className="box-wishlist tf-action-btns">
                            <i className="flaticon-heart" />
                          </div>
                        </div>
                        <div className="content">
                          <div className="meta">
                            <div className="meta-item">
                              <i className="flaticon-calendar" />
                              <p>{course.lessons} Lessons</p>
                            </div>
                            <div className="meta-item">
                              <i className="flaticon-clock" />
                              <p>{course.hours} hours</p>
                            </div>
                          </div>
                          <h6 className="fw-5 line-clamp-2">
                            <a href="course-single-v2.html">{course.title}</a>
                          </h6>
                          <div className="ratings pb-30">
                            <div className="number">{course.rating}</div>
                            <i className="icon-star-1" />
                            <i className="icon-star-1" />
                            <i className="icon-star-1" />
                            <i className="icon-star-1" />
                            <svg
                              width={12}
                              height={11}
                              viewBox="0 0 12 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382ZM11.0444 4.15626L11.0442 4.15651L11.0444 4.15626Z"
                                stroke="#131836"
                              />
                            </svg>
                            <div className="total">({course.totalReviews})</div>
                          </div>
                          <div className="author">
                            By:
                            <a href="#" className="author">
                              {course.author}
                            </a>
                          </div>
                          <div className="bottom">
                            <div className="h6 price fw-5">${course.price}</div>
                            <a
                              href="course-single-v2.html"
                              className="tf-btn-arrow"
                            >
                              <span className="fw-5 fs-15">Enroll Course</span>
                              <i className="icon-arrow-top-right" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div
                className="swiper-button-prev btns-style-arrow courses5-prev swiper-button-disabled"
                tabIndex={-1}
                role="button"
                aria-label="Previous slide"
                aria-controls="swiper-wrapper-f92d32152cb8b62f"
                aria-disabled="true"
              />
              <div
                className="swiper-button-next btns-style-arrow courses5-next"
                tabIndex={0}
                role="button"
                aria-label="Next slide"
                aria-controls="swiper-wrapper-f92d32152cb8b62f"
                aria-disabled="false"
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CourseDetailView
