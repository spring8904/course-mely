import Link from 'next/link'

import CourseListItem from '../_components/course-list-item'
import CourseListSidebar from '../_components/course-list-sidebar'

const CourseListView = () => {
  return (
    <>
      <div className="page-title style-2 has-tags-bg-white">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
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
                <CourseListSidebar />
              </div>
              <div className="col-xl-9">
                <CourseListItem />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseListView
