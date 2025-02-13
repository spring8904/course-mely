import React from 'react'

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
const CourseListItem = () => {
  return (
    <div className="wrap-courses style-left">
      <div className="sort-by-wrap mb-[30px]">
        <div className="sort-wrap">
          <p className="text text-1 wow fadeInUp grow">
            Showing 1-9 Of 62 Courses
          </p>
          <div className="d-flex">
            <p className="text text-2 wow fadeInUp ps-0" data-wow-delay="0.1s">
              Sort by
            </p>
            <div
              className="nice-select default wow fadeInUp"
              data-wow-delay="0.1s"
              tabIndex={0}
            >
              <span className="current text text-1">Best Selling</span>
              <ul className="list">
                <li data-value="" className="option selected text text-1">
                  Best Selling
                </li>
                <li data-value="For Ren" className="option text text-1">
                  Oldest
                </li>
                <li data-value="Sold" className="option text text-1">
                  3 days
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-list-items-3">
        {courses.map((course, index) => (
          <div key={index} className="course-item hover-img h240 wow fadeInUp">
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
                {[...Array(Math.floor(course.ratings))].map((_, i) => (
                  <i key={i} className="icon-star-1" />
                ))}
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
                <a href="course-single-v2.html" className="tf-btn-arrow">
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
  )
}

export default CourseListItem
