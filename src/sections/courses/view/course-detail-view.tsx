'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import {
  ChevronDown,
  ChevronUp,
  CircleHelp,
  CirclePlay,
  CircleX,
  Eye,
  FileCode2,
  Loader2,
  ScrollText,
} from 'lucide-react'
import { toast } from 'react-toastify'

import { formatCurrency, formatDuration } from '@/lib/common'
import {
  useGetCourseDetails,
  useGetCoursesOther,
  useGetCoursesRelated,
} from '@/hooks/course/useCourse'
import { useEnrollFreeCourse } from '@/hooks/transation/useTransation'

import BuyCourseModal from '@/sections/courses/_components/buy-course-modal'

import CourseSlide from '../_components/course-slide'
import { InstructorDetail } from '@/sections/courses/_components/instructorDetail'
import { LessonPreviewModal } from '@/sections/courses/_components/course-list-sidebar/preview-model'
import { IChapter } from '@/types'
import CourseSlideRelated from '@/sections/courses/_components/course-slide-related'

const lessonTypeIcons = {
  video: <CirclePlay size={16} />,
  document: <ScrollText size={16} />,
  quiz: <CircleHelp size={16} />,
  coding: <FileCode2 size={16} />,
}
const lessonTypeLabels: Record<string, string> = {
  video: 'Video Bài',
  quiz: 'Quiz',
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

const CourseDetailView = ({ slug }: { slug: string }) => {
  const router = useRouter()

  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [benefitsColumn1, setBenefitsColumn1] = useState<string[]>([])
  const [benefitsColumn2, setBenefitsColumn2] = useState<string[]>([])
  const [requirementsColumn1, setRequirementsColumn1] = useState<string[]>([])
  const [requirementsColumn2, setRequirementsColumn2] = useState<string[]>([])
  const [isOpenIntro, setIsOpenIntro] = useState<boolean>(false)
  const [isOpenBuyCourse, setIsOpenBuyCourse] = useState<boolean>(false)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [expandedChapters, setExpandedChapters] = useState<number[]>([])

  const { user, isAuthenticated } = useAuthStore()

  const { mutate: enrollFreeCourse } = useEnrollFreeCourse()
  const { data: courseDetails, isLoading: isCourseDetailsLoading } =
    useGetCourseDetails(slug)
  const { data: coursesRelatedData, isLoading: isCoursesRelatedDataLoading } =
    useGetCoursesRelated(slug)
  const { data: coursesOtherData, isLoading: isCoursesOtherDataLoading } =
    useGetCoursesOther(slug)

  useEffect(() => {
    if (courseDetails?.updated_at) {
      const date = new Date(courseDetails.updated_at)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      setLastUpdated(`${day}/${month}/${year}`)
    }
  }, [courseDetails?.updated_at])

  useEffect(() => {
    if (courseDetails?.benefits) {
      const parsedBenefits = Array.isArray(courseDetails.benefits)
        ? courseDetails.benefits
        : JSON.parse(courseDetails.benefits)

      const halfLength = Math.ceil(parsedBenefits.length / 2)
      setBenefitsColumn1(parsedBenefits.slice(0, halfLength))
      setBenefitsColumn2(parsedBenefits.slice(halfLength))
    }

    if (courseDetails?.requirements) {
      const parsedRequirements = Array.isArray(courseDetails.requirements)
        ? courseDetails.requirements
        : JSON.parse(courseDetails.requirements)

      const halfLength = Math.ceil(parsedRequirements.length / 2)
      setRequirementsColumn1(parsedRequirements.slice(0, halfLength))
      setRequirementsColumn2(parsedRequirements.slice(halfLength))
    }
  }, [courseDetails?.benefits, courseDetails?.requirements])

  useEffect(() => {
    if (isOpenIntro) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      if (isOpenIntro) {
        document.body.classList.remove('overflow-hidden')
      }
    }
  }, [isOpenIntro])

  const handlePreviewClick = (lesson: any) => {
    setSelectedLesson(lesson)
    setIsPreviewOpen(true)
  }

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    )
  }

  if (
    isCourseDetailsLoading ||
    isCoursesRelatedDataLoading ||
    isCoursesOtherDataLoading
  ) {
    return (
      <div className="mt-20">
        <Loader2 className="mx-auto size-8 animate-spin" />
      </div>
    )
  }

  return (
    <>
      <div className="pt-0">
        <section className="section-page-title page-title style-5">
          <div className="tf-container">
            <div className="row">
              <div className="col-lg-8">
                <div className="content">
                  <ul className="breadcrumbs mb-[60px] flex items-center justify-start gap-[10px]">
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
                    <li>{courseDetails?.name}</li>
                  </ul>
                  <h2 className="fw-7">{courseDetails?.name}</h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: courseDetails?.description || '',
                    }}
                  ></p>

                  <ul className="entry-meta mt-4">
                    {(courseDetails?.ratings_count ?? 0) > 0 && (
                      <li>
                        <div className="ratings">
                          <div className="number">
                            {courseDetails?.avg_rating}
                          </div>
                          {Array.from({ length: 5 }, (_, index) => (
                            <i
                              key={index}
                              className={`icon-star-1 ${
                                index <
                                Math.round(
                                  Number(courseDetails?.avg_rating ?? 0)
                                )
                                  ? 'text-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            ></i>
                          ))}
                          <p className="total fs-15">
                            {' '}
                            {courseDetails?.ratings_count} đánh giá
                          </p>
                        </div>
                      </li>
                    )}
                    <li>
                      <i className="flaticon-book" />
                      <p>{courseDetails?.chapters_count}</p>
                    </li>
                    <li>
                      <i className="flaticon-user" />
                      <p>{courseDetails?.total_student} Học viên</p>
                    </li>
                    <li>
                      <i className="flaticon-clock" />
                      <p>Cập nhật ngày {lastUpdated}</p>
                    </li>
                  </ul>
                  <div className="author-item">
                    <div className="author-item-img">
                      <Image
                        width="50"
                        height={50}
                        src={courseDetails?.user.avatar || ''}
                        alt=""
                      />
                    </div>
                    <div className="text">
                      <span className="text-1">By </span>
                      <a href="#">{courseDetails?.user?.name}</a>
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
                        {benefitsColumn1?.length > 0 &&
                          benefitsColumn1?.map((benefit, index) => (
                            <li key={index} className="item">
                              <i className="flaticon-check" />
                              {benefit}
                            </li>
                          ))}
                      </ul>
                      <ul className="learn-list">
                        {benefitsColumn2?.map((benefit, index) => (
                          <li key={index} className="item">
                            <i className="flaticon-check" />
                            {truncateText(benefit, 50)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="page-learn">
                    <h2
                      className="text-22 fw-5 wow fadeInUp"
                      data-wow-delay="0s"
                    >
                      Yêu cầu
                    </h2>
                    <div className="learn-inner">
                      <ul className="learn-list">
                        {requirementsColumn1?.map((requirement, index) => (
                          <li key={index} className="item">
                            <i className="flaticon-check" />
                            {truncateText(requirement, 50)}
                          </li>
                        ))}
                      </ul>
                      <ul className="learn-list">
                        {requirementsColumn2?.map((requirement, index) => (
                          <li key={index} className="item">
                            <i className="flaticon-check" />
                            {requirement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="container mx-auto px-4 py-8">
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                      <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-gray-900">
                          Nội dung khóa học
                        </h2>
                        <div className="text-sm text-gray-500">
                          {courseDetails?.chapters?.length || 0} chương học
                        </div>
                      </div>
                      <div className="space-y-4">
                        {courseDetails?.chapters?.map(
                          (chapter: IChapter, chapterIndex) => (
                            <div
                              key={chapter.id}
                              className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 ease-in-out"
                            >
                              <button
                                onClick={() => toggleChapter(chapter.id!)}
                                className="flex w-full items-center justify-between bg-gray-50 px-6 py-4 transition hover:bg-gray-100"
                              >
                                <div className="flex items-center gap-4">
                                  <span className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-orange-500">
                                    {chapterIndex + 1}
                                  </span>
                                  <div className="text-left">
                                    <h3 className="text-lg font-medium text-gray-900">
                                      {chapter.title}
                                    </h3>
                                    <div className="flex gap-2">
                                      <p className="text-sm text-gray-500">
                                        {chapter.lessons_count} bài học
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        {formatDuration(
                                          chapter.total_video_duration ?? 0
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {expandedChapters.includes(chapter.id!) ? (
                                  <ChevronUp className="size-5 text-gray-400" />
                                ) : (
                                  <ChevronDown className="size-5 text-gray-400" />
                                )}
                              </button>

                              {expandedChapters.includes(chapter.id!) && (
                                <div className="divide-y divide-gray-100">
                                  {chapter.lessons?.map(
                                    (lesson, lessonIndex) => (
                                      <div
                                        key={lesson.id}
                                        className="flex items-center gap-4 px-6 py-4 transition hover:bg-gray-50"
                                      >
                                        <div className="flex min-w-0 flex-1 items-center gap-4">
                                          <span className="text-sm font-medium text-gray-400">
                                            {lessonIndex + 1}
                                          </span>
                                          {lessonTypeIcons[lesson.type]}
                                          <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between">
                                              <h4 className="truncate text-base font-medium text-gray-900">
                                                {lesson.title}
                                              </h4>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                              {lessonTypeLabels[lesson.type]}
                                            </p>
                                          </div>
                                        </div>

                                        {lesson.is_free_preview === 1 && (
                                          <button
                                            onClick={() =>
                                              handlePreviewClick(lesson)
                                            }
                                            className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-orange-600 transition hover:bg-blue-100"
                                          >
                                            <Eye size={16} />
                                            Xem trước
                                          </button>
                                        )}
                                        <div>
                                          {lesson.type === 'video' &&
                                            lesson.lessonable?.duration && (
                                              <span className="text-sm text-gray-500">
                                                {formatDuration(
                                                  lesson.lessonable.duration
                                                )}
                                              </span>
                                            )}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <LessonPreviewModal
                      isOpen={isPreviewOpen}
                      onClose={() => setIsPreviewOpen(false)}
                      lesson={selectedLesson}
                    />
                  </div>
                  {coursesOtherData?.profile_instructor && (
                    <InstructorDetail
                      instructorDetail={coursesOtherData.profile_instructor}
                    />
                  )}
                  <div className="page-my-course">
                    <div className="heading-section">
                      <h6
                        className="fw-5 text-22 wow fadeInUp"
                        data-wow-delay="0s"
                      >
                        Khoá học khác
                      </h6>
                    </div>
                    {coursesOtherData?.get_other_courses && (
                      <CourseSlide
                        courses={coursesOtherData?.get_other_courses}
                      />
                    )}
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
                            <a href="#">{courseDetails?.user?.name}</a>
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
                            similique ducimus et debitis molestiae. Et autem
                            quia eum reprehenderit voluptates est reprehenderit
                            illo est enim perferendis est neque sunt.{' '}
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
                            similique ducimus et debitis molestiae. Et autem
                            quia eum reprehenderit voluptates est reprehenderit
                            illo est enim perferendis est neque sunt.{' '}
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
                    {courseDetails?.intro ? (
                      <>
                        <div className="relative inline-block cursor-pointer">
                          <img
                            src={courseDetails?.thumbnail ?? ''}
                            alt="Video thumbnail"
                            className="w-full max-w-md rounded-lg shadow-lg transition-opacity hover:opacity-50"
                            onClick={() => setIsOpenIntro(true)}
                          />

                          <div
                            className="absolute inset-0 flex items-center justify-center"
                            onClick={() => setIsOpenIntro(true)}
                          >
                            <CirclePlay
                              size={36}
                              className="text-white opacity-80 hover:opacity-100"
                            />
                          </div>
                        </div>

                        {isOpenIntro && (
                          <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                            onClick={() => setIsOpenIntro(false)}
                          >
                            <div
                              className="flex w-full max-w-2xl flex-col space-y-4 rounded-lg bg-white p-6 shadow-lg"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-between">
                                <p className="text-2xl font-bold">Intro</p>

                                <button
                                  onClick={() => setIsOpenIntro(false)}
                                  className="text-gray-600 hover:text-gray-900"
                                >
                                  <CircleX color="#321a1a" />
                                </button>
                              </div>
                              <video controls className="w-full">
                                <source
                                  src={courseDetails.intro}
                                  type="video/mp4"
                                />
                                Trình duyệt của bạn không hỗ trợ video.
                              </video>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <img
                        src={courseDetails?.thumbnail ?? ''}
                        alt={courseDetails?.name}
                      />
                    )}
                  </div>
                  <div className="sidebar-course-content">
                    <div className="course-price">
                      {courseDetails?.is_free === 1 ? (
                        <div className="price">
                          <h3 className="fw-5">Miễn phí</h3>
                        </div>
                      ) : (courseDetails?.price_sale ?? 0) > 0 ? (
                        <>
                          <div className="price">
                            <h3 className="fw-5">
                              {formatCurrency(courseDetails?.price_sale ?? 0)}
                            </h3>
                            <h6 className="fs-15">
                              {formatCurrency(courseDetails?.price ?? 0)}
                            </h6>
                          </div>
                          <p className="sale-off">
                            {courseDetails?.price &&
                              Math.round(
                                ((courseDetails.price -
                                  (courseDetails.price_sale ?? 0)) /
                                  courseDetails.price) *
                                  100
                              )}
                            % OFF
                          </p>
                        </>
                      ) : (courseDetails?.price ?? 0) > 0 ? (
                        <div className="price">
                          <h3 className="fw-5">
                            {formatCurrency(courseDetails?.price ?? 0)}
                          </h3>
                        </div>
                      ) : (
                        <div className="price">
                          <h3 className="fw-5">Miễn phí</h3>
                        </div>
                      )}
                    </div>
                    <button
                      disabled={
                        courseDetails?.user_id === user?.id ||
                        courseDetails?.is_enrolled
                      }
                      onClick={() => {
                        if (!user || !isAuthenticated) {
                          router.push('/sign-in')
                          return
                        }

                        if (
                          courseDetails?.user_id === user?.id ||
                          courseDetails?.is_enrolled
                        ) {
                          router.push('/my-courses')
                          return
                        }

                        if (courseDetails?.is_free === 1) {
                          import('sweetalert2').then((Swal) => {
                            Swal.default
                              .fire({
                                title: 'Xác nhận tham gia khoá học',
                                text: 'Bạn có chắc chắn muốn tham gia khoá học này?',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonText: 'Tham gia ',
                                cancelButtonText: 'Huỷ',
                              })
                              .then((result) => {
                                if (result.isConfirmed) {
                                  enrollFreeCourse(String(courseDetails?.id), {
                                    onSuccess: (res: any) => {
                                      toast.info(res.message)
                                      router.push('/my-courses')
                                    },
                                  })
                                }
                              })
                          })
                        } else {
                          setIsOpenBuyCourse(true)
                        }
                      }}
                      type="button"
                      className="tf-btn add-to-cart cursor-pointer"
                    >
                      {courseDetails?.user_id === user?.id ||
                      courseDetails?.is_enrolled
                        ? 'Đã sở hữu khoá học'
                        : courseDetails?.is_free === 1
                          ? 'Tham gia ngay'
                          : 'Mua khoá học'}
                      <i className="icon-shopcart fs-18"></i>
                    </button>
                    <div className="course-list">
                      <h5 className="fw-5">Khoá học gồm có:</h5>
                      <ul className="course-benefit-list">
                        <li className="course-benefit-item">
                          <i className="flaticon-play-1" />
                          <p>
                            {formatDuration(
                              courseDetails?.total_video_duration ?? 0
                            )}
                          </p>
                        </li>
                        <li className="course-benefit-item">
                          <i className="flaticon-document" />
                          <p>{courseDetails?.lessons_count} bài học</p>
                        </li>
                        <li className="course-benefit-item">
                          <i className="icon-extremely" />
                          <p>Truy cập chọn đời</p>
                        </li>
                        <li className="course-benefit-item">
                          <i className="flaticon-medal" />
                          <p>Cấp chứng chỉ khi hoàn thành</p>
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
        <section className="tf-spacing-9 section-course pt-0">
          <div className="tf-container">
            <div className="row">
              <div className="col-12">
                <div className="heading-section">
                  <h2 className="fw-7 wow fadeInUp" data-wow-delay="0s">
                    Khoá học có thể phù hợp với bạn
                  </h2>
                  <div className="flex flex-wrap items-center justify-between gap-[10px]">
                    <div className="sub fs-15 wow fadeInUp" data-wow-delay="0s">
                      Những khoá học tương tự dành cho bạn
                    </div>
                    <Link
                      href="/courses"
                      className="tf-btn-arrow wow fadeInUp"
                      data-wow-delay="0.1s"
                    >
                      Xem thêm <i className="icon-arrow-top-right" />
                    </Link>
                  </div>
                </div>
                {coursesRelatedData?.related_courses && (
                  <CourseSlideRelated
                    courses={coursesRelatedData?.related_courses}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <BuyCourseModal
        course={courseDetails as any}
        isOpen={isOpenBuyCourse}
        onClose={() => setIsOpenBuyCourse(false)}
      />
    </>
  )
}

export default CourseDetailView
