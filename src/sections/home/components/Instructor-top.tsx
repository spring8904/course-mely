import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

const instructorsData = [
  {
    name: 'Theresa Webb',
    image: '/assets/images/instructors/instructors-01.jpg',
    students: 345,
    courses: 34,
    description: 'Professional Web Developer',
    rating: 4.9,
  },
  {
    name: 'Ronald Richards',
    image: '/assets/images/instructors/instructors-02.jpg',
    students: 345,
    courses: 34,
    description: 'Professional Web Developer',
    rating: 4.9,
  },
  {
    name: 'Savannah Nguyen',
    image: '/assets/images/instructors/instructors-03.jpg',
    students: 345,
    courses: 34,
    description: 'Professional Web Developer',
    rating: 4.9,
  },
  {
    name: 'Kristin Watson',
    image: '/assets/images/instructors/instructors-04.jpg',
    students: 345,
    courses: 34,
    description: 'Professional Web Developer',
    rating: 4.9,
  },
  {
    name: 'Cameron Williamson',
    image: '/assets/images/instructors/instructors-05.jpg',
    students: 345,
    courses: 34,
    description: 'Professional Web Developer',
    rating: 4.9,
  },
]

const InstructorTop = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <section className="section-instructor tf-spacing-3 pt-0">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section">
              <h2 className="fw-7 wow fadeInUp" data-wow-delay="0s">
                {title}
              </h2>
              <div className="flex flex-wrap items-center justify-between gap-10">
                <div className="sub fs-15 wow fadeInUp" data-wow-delay="0.1s">
                  {description}
                </div>
                <a
                  href="instructor-list.html"
                  className="tf-btn-arrow wow fadeInUp"
                  data-wow-delay="0.2s"
                >
                  Xem thêm <i className="icon-arrow-top-right" />
                </a>
              </div>
            </div>
            <Swiper
              spaceBetween={30}
              slidesPerView={4}
              loop={true}
              className="swiper-container slider-courses-5 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              {instructorsData.map((instructor, index) => (
                <SwiperSlide key={index}>
                  <div className="instructors-item hover-img style-column">
                    <div className="image-wrap">
                      <img
                        className="lazyload"
                        data-src={instructor.image}
                        src={instructor.image}
                        alt={instructor.name}
                      />
                    </div>
                    <div className="entry-content">
                      <ul className="entry-meta">
                        <li>
                          <i className="flaticon-user" />
                          {instructor.students} Students
                        </li>
                        <li>
                          <i className="flaticon-play" />
                          {instructor.courses} Courses
                        </li>
                      </ul>
                      <h6 className="entry-title">
                        <a href="#">{instructor.name}</a>
                      </h6>
                      <p className="short-description">
                        {instructor.description}
                      </p>
                      <div className="ratings">
                        <div className="number">{instructor.rating}</div>
                        <i className="icon-star-1" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InstructorTop
