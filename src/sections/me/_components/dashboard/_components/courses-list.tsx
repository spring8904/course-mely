import React from 'react'
const courses = [
  {
    image: '/assets/images/courses/courses-01.jpg',
    lessons: 11,
    hours: 16,
    title: 'Become a Certified Web Developer: HTML, CSS and JavaScript',
    ratings: 4.9,
    students: 229,
    complete: 80,
  },
  {
    image: '/assets/images/courses/courses-02.jpg',
    lessons: 11,
    hours: 16,
    title: 'Become a Certified Web Developer: HTML, CSS and JavaScript',
    ratings: 4.9,
    students: 229,
    complete: 77,
  },
  {
    image: '/assets/images/courses/courses-03.jpg',
    lessons: 11,
    hours: 16,
    title: 'Become a Certified Web Developer: HTML, CSS and JavaScript',
    ratings: 4.9,
    students: 229,
    complete: 66,
  },
  {
    image: '/assets/images/courses/courses-04.jpg',
    lessons: 11,
    hours: 16,
    title: 'Become a Certified Web Developer: HTML, CSS and JavaScript',
    ratings: 4.9,
    students: 229,
    complete: 55,
  },
  {
    image: '/assets/images/courses/courses-05.jpg',
    lessons: 11,
    hours: 16,
    title: 'Become a Certified Web Developer: HTML, CSS and JavaScript',
    ratings: 4.9,
    students: 229,
    complete: 80,
  },
]
const CoursesList = () => {
  return (
    <div className="widget-content-inner active">
      <div className="row">
        {courses.map((course, index) => (
          <div key={index} className="col-xl-4">
            <div
              className="course-item hover-img wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="features image-wrap">
                <img
                  className="lazyload"
                  data-src={course.image}
                  src={course.image}
                  alt={course.title}
                />

                <div className="box-wishlist tf-action-btns">
                  <i className="flaticon-heart"></i>
                </div>
              </div>
              <div className="content">
                <div className="meta">
                  <div className="meta-item">
                    <i className="flaticon-calendar"></i>
                    <p>{course.lessons}Lessons</p>
                  </div>
                  <div className="meta-item">
                    <i className="flaticon-clock"></i>
                    <p>{course.hours} hours</p>
                  </div>
                </div>
                <h6 className="fw-5 line-clamp-2">
                  <a href="course-single-v5.html">{course.title}</a>
                </h6>
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
                  Download Certificate <i className="icon-arrow-top-right"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CoursesList
