import React from 'react'
import Link from 'next/link'

import { ICourseDataResponse, ICourseFilter } from '@/types'
import { formatCurrency } from '@/lib/common'

import { SortByDropdown } from '@/sections/courses/_components/sort-by-dropdown'

type Props = {
  dataFilters: ICourseFilter
  coursesData: ICourseDataResponse
  setDataFilters: React.Dispatch<React.SetStateAction<ICourseFilter>>
}

const CourseListItem = ({
  coursesData,
  dataFilters,
  setDataFilters,
}: Props) => {
  const handlePageChange = (pageUrl?: string | null) => {
    if (!pageUrl) return

    const url = new URL(pageUrl)
    const page = Number(url.searchParams.get('page'))

    if (page) {
      setDataFilters((prev) => {
        const updatedFilters = {
          ...prev,
          page,
        }

        localStorage.setItem('courseFilters', JSON.stringify(updatedFilters))

        return updatedFilters
      })
    }
  }

  return (
    <div className="wrap-courses style-left">
      <div className="sort-by-wrap mb-[30px]">
        <div className="sort-wrap">
          <p className="text text-1 wow fadeInUp grow">
            Hiển thị {coursesData?.from}-{coursesData?.to} trong{'  '}
            {coursesData?.total} khoá học
          </p>
          <SortByDropdown
            dataFilters={dataFilters}
            setDataFilters={setDataFilters}
          />
        </div>
      </div>
      <div className="grid-list-items-3">
        {coursesData?.data?.map((course, index) => (
          <div key={index} className="course-item hover-img h240 wow fadeInUp">
            <div className="features image-wrap">
              <img
                className="lazyload"
                data-src={
                  course?.thumbnail ?? '/assets/images/courses/courses-01.jpg'
                }
                src={
                  course?.thumbnail ?? '/assets/images/courses/courses-01.jpg'
                }
                alt={course?.name}
              />
              <div className="box-wishlist tf-action-btns">
                <i className="flaticon-heart" />
              </div>
            </div>
            <div className="content">
              <div className="meta">
                <div className="meta-item">
                  <i className="flaticon-calendar" />
                  <p>{course?.lessons_count ?? 0} bài học</p>
                </div>
                <div className="meta-item">
                  <i className="flaticon-user" />
                  <p>{course?.total_student ?? 0} học viên</p>
                </div>
                <div className="meta-item">
                  <i className="flaticon-clock" />
                  <p>9 giờ học</p>
                </div>
              </div>
              <h5 className="fw-5 line-clamp-2">
                <Link href={`/courses/${course?.slug}`}>{course?.name}</Link>
              </h5>
              <div className="ratings pb-30">
                <div className="number">{4}</div>
                {[...Array(Math.floor(4))].map((_, i) => (
                  <i key={i} className="icon-star-1" />
                ))}
                {4 % 1 > 0 && (
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
                <div className="total">({course?.total_student})</div>
              </div>
              <div className="author">
                By:{' '}
                <a href="#" className="author">
                  {course?.user?.name}
                </a>
              </div>
              <div className="bottom">
                <div className="h5 price fw-5">
                  {parseFloat(`${course?.price_sale}`) > 0 ? (
                    <>
                      <span className="text-danger fw-bold">
                        {formatCurrency(parseFloat(`${course?.price_sale}`))}
                      </span>
                      &nbsp;
                      <span className="text-decoration-line-through text-sm text-muted">
                        {formatCurrency(parseFloat(`${course?.price}`))}
                      </span>
                    </>
                  ) : (
                    <span>
                      {formatCurrency(parseFloat(`${course?.price}`))}
                    </span>
                  )}
                </div>
                <Link
                  href={`/courses/${course?.slug}`}
                  className="tf-btn-arrow"
                >
                  <span className="fw-5">Đăng ký</span>
                  <i className="icon-arrow-top-right" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <ul className="wg-pagination wow fadeInUp justify-center">
          {coursesData.links.map((link, index) => {
            const isActive = link.active ? 'bg-orange-200' : ''
            return (
              <li key={index}>
                <a
                  className={isActive}
                  style={{ width: 'fit-content', padding: '12px' }}
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(link.url)
                  }}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default CourseListItem
