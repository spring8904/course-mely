import Link from 'next/link'

const courses = [
  {
    image: '/assets/images/courses/courses-01.jpg',
    lessons: 11,
    students: 229,
    hours: 16,
    title: 'Become a Certified Web Developer: HTML, CSS and JavaScript',
    ratings: 4.9,
    author: 'Carolyn Welborn',
    price: 89.29,
  },
  {
    image: '/assets/images/courses/courses-02.jpg',
    lessons: 12,
    students: 300,
    hours: 18,
    title: 'Figma Prototyping: A deep dive for UX/UI Designer',
    ratings: 4.7,
    author: 'John Doe',
    price: 79.99,
  },
  {
    image: '/assets/images/courses/courses-03.jpg',
    lessons: 8,
    students: 150,
    hours: 10,
    title: 'Figma Prototyping: A deep dive for UX/UI Designer',
    ratings: 4.8,
    author: 'Jane Smith',
    price: 59.99,
  },
  {
    image: '/assets/images/courses/courses-04.jpg',
    lessons: 14,
    students: 299,
    hours: 11,
    title: 'Advanced JavaScript Programming',
    ratings: 5.0,
    author: 'Mark Johnson',
    price: 99.99,
  },
  {
    image: '/assets/images/courses/courses-05.jpg',
    lessons: 9,
    students: 120,
    hours: 12,
    title: 'Advanced JavaScript Programming',
    ratings: 4.6,
    author: 'Emily Davis',
    price: 49.99,
  },
]

const CourseListView = () => {
  return (
    <>
      <div className="page-title style-2 has-tags-bg-white">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
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
                  <li>Danh sách khoá học</li>
                  <li>
                    <i className="icon-arrow-right" />
                  </li>
                  <li>Khóa học phát triển web</li>
                </ul>
                <h2 className="font-cardo fw-7">Web Development Courses</h2>
                <p>
                  Với một trong các khóa học phát triển web trực tuyến của chúng
                  tôi, bạn có thể khám phá các lĩnh vực khác nhau của lĩnh vực
                  có nhu cầu cao này.
                </p>
                <div className="widget tags-list style3">
                  <h6>Các chủ đề liên quan đến Phát triển Web</h6>
                  <ul className="tag-list">
                    <li className="tag-list-item">
                      <a href="#">Design </a>
                    </li>
                    <li className="tag-list-item">
                      <a href="#">UX</a>
                    </li>
                    <li className="tag-list-item">
                      <a href="#">Java</a>
                    </li>
                    <li className="tag-list-item">
                      <a href="#">SEO</a>
                    </li>
                    <li className="tag-list-item">
                      <a href="#">Python</a>
                    </li>
                    <li className="tag-list-item">
                      <a href="#">Digital Media</a>
                    </li>
                    <li className="tag-list-item">
                      <a href="#">Software Development</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content pt-0">
        <div className="page-inner tf-spacing-1 pt-0">
          <div className="tf-container">
            <div
              className="tf-mobile-sidebar-btn btn-right"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithMobile"
              aria-controls="offcanvasWithBackdrop"
            >
              <i className="flaticon-setting" />
            </div>
            <div className="row">
              <div className="col-xl-3">
                <div className="tf-sidebar course">
                  <div className="sidebar-item widget wg-categorie tf-collapse-item">
                    <div className="sidebar-title tf-collapse-title">
                      <h5 className="fw-5">Categories</h5>
                      <i className="tf-collapse-icon icon-arrow-top" />
                    </div>
                    <ul className="tf-collapse-content showmore-item">
                      <li className="checkbox-item fl-item2">
                        <label>
                          <p>Web Development</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(432)</span>
                      </li>
                      <li className="checkbox-item fl-item2">
                        <label>
                          <p>Software Testing</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(12)</span>
                      </li>
                      <li className="checkbox-item fl-item2">
                        <label>
                          <p>Mobile Development</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(324)</span>
                      </li>
                      <li className="checkbox-item fl-item2">
                        <label>
                          <p>Game Development</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(87)</span>
                      </li>
                      <li className="checkbox-item fl-item2">
                        <label>
                          <p>Software Engineering</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(163)</span>
                      </li>
                      <li className="checkbox-item fl-item2">
                        <label>
                          <p>Game Development</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(87)</span>
                      </li>
                      <li className="checkbox-item fl-item2">
                        <label>
                          <p>Web Development</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(432)</span>
                      </li>
                      <li className="checkbox-item fl-item2">
                        <label>
                          <p>Game Development</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(87)</span>
                      </li>
                      <li className="checkbox-item fl-item2">
                        <label>
                          <p>Software Engineering</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(163)</span>
                      </li>
                    </ul>
                    <div className="btn-showmore showmore view-more-button">
                      <span className="title">
                        Show More <i className="icon icon-arrow-bottom" />
                      </span>
                    </div>
                  </div>
                  <div className="sidebar-item widget wg-categorie tf-collapse-item">
                    <div className="sidebar-title tf-collapse-title">
                      <h5 className="fw-5">Rating</h5>
                      <i className="tf-collapse-icon icon-arrow-top" />
                    </div>
                    <ul className="tf-collapse-content">
                      <li className="checkbox-item">
                        <label>
                          <div className="ratings">
                            <i className="icon-star-1" />
                            <i className="icon-star-1" />
                            <i className="icon-star-1" />
                            <i className="icon-star-1" />
                            <i className="icon-star-1" />
                          </div>
                          <input name="input-ratings" type="radio" />
                          <span className="btn-radio" />
                        </label>
                        <span>5</span>
                      </li>
                      <li className="checkbox-item">
                        <label>
                          <div className="ratings">
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
                          <input name="input-ratings" type="radio" />
                          <span className="btn-radio" />
                        </label>
                        <span>4</span>
                      </li>
                      <li className="checkbox-item">
                        <label>
                          <div className="ratings">
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
                          <input name="input-ratings" type="radio" />
                          <span className="btn-radio" />
                        </label>
                        <span>3</span>
                      </li>
                      <li className="checkbox-item">
                        <label>
                          <div className="ratings">
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
                          <input name="input-ratings" type="radio" />
                          <span className="btn-radio" />
                        </label>
                        <span>2</span>
                      </li>
                      <li className="checkbox-item">
                        <label>
                          <div className="ratings">
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
                          <input name="input-ratings" type="radio" />
                          <span className="btn-radio" />
                        </label>
                        <span>1</span>
                      </li>
                    </ul>
                  </div>
                  <div className="sidebar-item widget wg-categorie tf-collapse-item">
                    <div className="sidebar-title tf-collapse-title">
                      <h5 className="fw-5">Instructor</h5>
                      <i className="tf-collapse-icon icon-arrow-top" />
                    </div>
                    <ul className="tf-collapse-content showmore-item2">
                      <li className="checkbox-item fl-item3">
                        <label>
                          <p>Kathryn Murphy</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(89)</span>
                      </li>
                      <li className="checkbox-item fl-item3">
                        <label>
                          <p>Eleanor Pena</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(58)</span>
                      </li>
                      <li className="checkbox-item fl-item3">
                        <label>
                          <p>Theresa Webb</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(135)</span>
                      </li>
                      <li className="checkbox-item fl-item3">
                        <label>
                          <p>Bessie Cooper</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(87)</span>
                      </li>
                      <li className="checkbox-item fl-item3">
                        <label>
                          <p>Software Engineering</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(163)</span>
                      </li>
                      <li className="checkbox-item fl-item3">
                        <label>
                          <p>Game Development</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(87)</span>
                      </li>
                      <li className="checkbox-item fl-item3">
                        <label>
                          <p>Web Development</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(432)</span>
                      </li>
                      <li className="checkbox-item fl-item3">
                        <label>
                          <p>Game Development</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(87)</span>
                      </li>
                      <li className="checkbox-item fl-item3">
                        <label>
                          <p>Software Engineering</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(163)</span>
                      </li>
                    </ul>
                    <div className="btn-showmore2 showmore view-more-button2">
                      <span className="title">
                        Show More <i className="icon icon-arrow-bottom" />
                      </span>
                    </div>
                  </div>
                  <div className="sidebar-item widget wg-categorie tf-collapse-item">
                    <div className="sidebar-title tf-collapse-title">
                      <h5 className="fw-5">Level</h5>
                      <i className="tf-collapse-icon icon-arrow-top" />
                    </div>
                    <ul className="tf-collapse-content">
                      <li className="checkbox-item">
                        <label>
                          <p>Beginner</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(178)</span>
                      </li>
                      <li className="checkbox-item">
                        <label>
                          <p>Intermediate</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(89)</span>
                      </li>
                      <li className="checkbox-item">
                        <label>
                          <p>Expert</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(58)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="sidebar-item widget wg-categorie tf-collapse-item">
                    <div className="sidebar-title tf-collapse-title">
                      <h5 className="fw-5">Price</h5>
                      <i className="tf-collapse-icon icon-arrow-top" />
                    </div>
                    <ul className="tf-collapse-content">
                      <li className="checkbox-item">
                        <label>
                          <p>Free</p>
                          <input name="input-price" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(178)</span>
                      </li>
                      <li className="checkbox-item">
                        <label>
                          <p>Paid</p>
                          <input name="input-price" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(89)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="sidebar-item widget wg-categorie tf-collapse-item">
                    <div className="sidebar-title tf-collapse-title">
                      <h5 className="fw-5">Language</h5>
                      <i className="tf-collapse-icon icon-arrow-top" />
                    </div>
                    <ul className="tf-collapse-content showmore-item3">
                      <li className="checkbox-item fl-item4">
                        <label>
                          <p>English</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(178)</span>
                      </li>
                      <li className="checkbox-item fl-item4">
                        <label>
                          <p>French</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(89)</span>
                      </li>
                      <li className="checkbox-item fl-item4">
                        <label>
                          <p>German</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(89)</span>
                      </li>
                      <li className="checkbox-item fl-item4">
                        <label>
                          <p>Italian</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(87)</span>
                      </li>
                      <li className="checkbox-item fl-item4">
                        <label>
                          <p>Turkish</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(163)</span>
                      </li>
                      <li className="checkbox-item fl-item4">
                        <label>
                          <p>Spain</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(87)</span>
                      </li>
                      <li className="checkbox-item fl-item4">
                        <label>
                          <p>japanese</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(432)</span>
                      </li>
                      <li className="checkbox-item fl-item4">
                        <label>
                          <p>thailand</p>
                          <input name="input-level" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(87)</span>
                      </li>
                    </ul>
                    <div className="btn-showmore3 showmore view-more-button3">
                      <span className="title">
                        Show More <i className="icon icon-arrow-bottom" />
                      </span>
                    </div>
                  </div>
                  <div className="sidebar-item widget wg-categorie tf-collapse-item">
                    <div className="sidebar-title tf-collapse-title">
                      <h5 className="fw-5">Video Duration</h5>
                      <i className="tf-collapse-icon icon-arrow-top" />
                    </div>
                    <ul className="tf-collapse-content">
                      <li className="checkbox-item">
                        <label>
                          <p>0-1 Hour</p>
                          <input name="input-videoduration" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(178)</span>
                      </li>
                      <li className="checkbox-item">
                        <label>
                          <p>1-3 Hours</p>
                          <input name="input-videoduration" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(89)</span>
                      </li>
                      <li className="checkbox-item">
                        <label>
                          <p>3-6 Hours</p>
                          <input name="input-videoduration" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(58)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="sidebar-item widget wg-categorie tf-collapse-item">
                    <div className="sidebar-title tf-collapse-title">
                      <h5 className="fw-5">Features</h5>
                      <i className="tf-collapse-icon icon-arrow-top" />
                    </div>
                    <ul className="tf-collapse-content">
                      <li className="checkbox-item">
                        <label>
                          <p>Subtitle</p>
                          <input name="input-features" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(178)</span>
                      </li>
                      <li className="checkbox-item">
                        <label>
                          <p>Quizzes</p>
                          <input name="input-features" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(89)</span>
                      </li>
                      <li className="checkbox-item">
                        <label>
                          <p>Coding Exercises</p>
                          <input name="input-features" type="radio" />
                          <span className="btn-checkbox" />
                        </label>
                        <span>(58)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-9">
                <div className="wrap-courses style-left">
                  <div className="sort-by-wrap mb-30">
                    <div className="sort-wrap">
                      <p className="text text-1 wow fadeInUp grow">
                        Showing 1-9 Of 62 Courses
                      </p>
                      <div className="d-flex">
                        <p
                          className="text text-2 wow fadeInUp ps-0"
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
                            Best Selling
                          </span>
                          <ul className="list">
                            <li
                              data-value=""
                              className="option selected text text-1"
                            >
                              Best Selling
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
                  <div className="grid-list-items-3">
                    {courses.map((course, index) => (
                      <div
                        key={index}
                        className="course-item hover-img h240 wow fadeInUp"
                      >
                        <div className="features image-wrap">
                          <img
                            className="lazyload"
                            data-src={course.image}
                            src={course.image}
                            alt={course.title}
                          />
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
                              <i className="flaticon-user" />
                              <p>{course.students} Students</p>
                            </div>
                            <div className="meta-item">
                              <i className="flaticon-clock" />
                              <p>{course.hours} hours</p>
                            </div>
                          </div>
                          <h5 className="fw-5 line-clamp-2">
                            <a href="course-single-v2.html">{course.title}</a>
                          </h5>
                          <div className="ratings pb-30">
                            <div className="number">{course.ratings}</div>
                            {[...Array(Math.floor(course.ratings))].map(
                              (_, i) => (
                                <i key={i} className="icon-star-1" />
                              )
                            )}
                            {course.ratings % 1 > 0 && (
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
                            )}
                            <div className="total">({course.students})</div>
                          </div>
                          <div className="author">
                            By:{' '}
                            <a href="#" className="author">
                              {course.author}
                            </a>
                          </div>
                          <div className="bottom">
                            <div className="h5 price fw-5">${course.price}</div>
                            <a
                              href="course-single-v2.html"
                              className="tf-btn-arrow"
                            >
                              <span className="fw-5">Enroll Course</span>
                              <i className="icon-arrow-top-right" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <ul className="wg-pagination wow fadeInUp justify-center">
                    <li>
                      <a href="#">
                        <i className="icon-arrow-left" />
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
                        <i className="icon-arrow-right" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseListView
