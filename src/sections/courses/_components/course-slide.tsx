'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import Image from 'next/image'
import { formatCurrency } from '@/lib/common'
import { ICourse } from '@/types'
import Link from 'next/link'

type Props = {
  courses: ICourse[]
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
        <SwiperSlide key={course?.id}>
          <div className="course-item hover-img title-small wow fadeInUp">
            <div
              className="features image-wrap"
              style={{ height: '150px', objectFit: 'cover' }}
            >
              <Image
                className="ls-is-cached lazyloaded"
                data-src={course?.thumbnail ?? ''}
                src={course?.thumbnail ?? ''}
                alt={course?.thumbnail ?? ''}
                fill
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
                  <p>{course?.lessons_count} Lessons</p>
                </div>
                <div className="meta-item">
                  <i className="flaticon-clock" />
                  <p>24 hours</p>
                </div>
              </div>
              <h6 className="fw-5 line-clamp-2">
                <Link href={`/courses/${course?.slug}`}>{course?.name}</Link>
              </h6>
              <div className="ratings pb-30">
                <div className="number">{course?.ratings_count}</div>
                {[...Array(course?.ratings_count)].map((_, i) => (
                  <i
                    key={i}
                    className={`icon-star-1 ${i < Math.floor(course?.ratings_count ?? 0) ? 'filled' : ''}`}
                  />
                ))}
                <div className="total">({course?.total_student})</div>
              </div>
              <div className="author">
                By:
                <a href="#" className="author">
                  {course?.user?.name}
                </a>
              </div>
              <div className="bottom">
                <div className="h6 price fw-5">
                  {course?.price_sale && +course.price_sale > 0 ? (
                    <div>
                      <span>{formatCurrency(course.price_sale)}</span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        {formatCurrency(course?.price ?? 0)}
                      </span>
                    </div>
                  ) : (
                    <span>{formatCurrency(course?.price ?? 0)}</span>
                  )}
                </div>
                <Link
                  href={`/courses/${course?.slug}`}
                  className="tf-btn-arrow"
                >
                  <span className="fw-5 fs-15">Đăng ký</span>
                  <i className="icon-arrow-top-right" />
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
export default CourseSlide
