import React from 'react'
import MeSearch from '../me-search'
import MeSort from '../me-sort'
import CoursesList from './_components/courses-list'
const MeMyCourses = () => {
  return (
    <div>
      <div className="section-my-courses-right section-right">
        <div className="row mb-10">
          <div className="pd-40 flex items-center">
            <div className="header-search wow fadeInUp grow">
              <MeSearch />
            </div>
            <div className="sort-by-wrap">
              <MeSort />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="widget-tabs style-small">
            <ul className="widget-menu-tab pd-40 overflow-x-auto">
              <li className="item-title active">Enrolled Courses</li>
              <li className="item-title">Active Courses</li>
              <li className="item-title">Completed Courses</li>
            </ul>
            <div className="widget-content-tab">
              <CoursesList />
            </div>
            <ul className="wg-pagination wow fadeInUp justify-center">
              <li>
                <a href="#">
                  <i className="icon-arrow-left"></i>
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
                  <i className="icon-arrow-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeMyCourses
