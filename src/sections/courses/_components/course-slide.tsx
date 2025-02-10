'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import Image from 'next/image'

type Props = {
  courses: any[]
}

const CourseSlide = ({ courses }: Props) => {
  return (
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
              <Image
                className="ls-is-cached lazyloaded"
                data-src={course.image}
                src={course.image}
                alt={course.title}
                width={206}
                height={150}
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
                <a href="#" className="tf-btn-arrow">
                  <span className="fw-5 fs-15">Enroll Course</span>
                  <i className="icon-arrow-top-right" />
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
export default CourseSlide
