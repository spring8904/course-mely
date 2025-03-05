import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

import { formatDuration } from '@/lib/common'
import { useGetMyCourses } from '@/hooks/user/useUser'

import { Button } from '@/components/ui/button'

const MyCourseView = () => {
  const { data: myCourseList, isLoading: myCourseListLoading } =
    useGetMyCourses()

  return (
    <>
      {myCourseListLoading && (
        <div className="mt-20">
          <Loader2 className="mx-auto size-8 animate-spin" />
        </div>
      )}
      <section className="section-inner mt-10">
        <div className="row mb-[50px]">
          {myCourseList?.data.map((course: any) => (
            <div className="col-xl-3" key={course.id}>
              <div className="course-item hover-img wow fadeInUp">
                <div
                  style={{
                    width: '100%',
                    height: '200px',
                    overflow: 'hidden',
                  }}
                  className="features image-wrap"
                >
                  <Image
                    className="lazyload"
                    src={course.thumbnail || ''}
                    alt=""
                    width={270}
                    height={160}
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div className="content">
                  <div className="meta">
                    <div className="meta-item">
                      <i className="flaticon-calendar"></i>
                      <p>{course.lessons_count || ''} Bài bài học</p>
                    </div>
                    <div className="meta-item">
                      <i className="flaticon-clock"></i>
                      <p>{formatDuration(course.total_video_duration || '')}</p>
                    </div>
                  </div>
                  <h6 className="fw-5 line-clamp-2">
                    <Link
                      href={`/courses/${course.slug}`}
                      style={{
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {course.name || ''}
                    </Link>
                  </h6>
                  <div className="ratings pb-30">
                    {course.ratings?.count > 0 ? (
                      <>
                        <div className="stars flex items-center">
                          {Array.from({ length: 5 }, (_, index) => (
                            <i
                              key={index}
                              className={`icon-star-1 ${
                                index < Math.round(course.ratings.average)
                                  ? 'text-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            ></i>
                          ))}
                        </div>
                        <div className="total text-sm text-gray-500">
                          ({course.ratings.count} lượt đánh giá)
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-gray-500">
                        Chưa có lượt đánh giá
                      </div>
                    )}
                  </div>
                  <div className="author">
                    Người hướng dẫn:
                    <a href="#" className="author">
                      {course.user.name || ''}
                    </a>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`/learning/${course.slug}/lesson/${course.current_lesson.id}`}
                    >
                      <Button
                        className={
                          course?.status === 'draft'
                            ? 'bg-yellow-500 text-white'
                            : course.progress_percent === 100
                              ? 'bg-green-500 text-white'
                              : 'bg-blue-500 text-white'
                        }
                      >
                        {course?.status === 'draft'
                          ? 'Đang sửa đổi nội dung'
                          : course.progress_percent === 100
                            ? 'Đã hoàn thành'
                            : 'Tiếp tục học'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default MyCourseView
