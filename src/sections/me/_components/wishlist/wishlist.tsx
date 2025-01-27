import React from 'react'
import MeSort from '../me-sort'
import CoursesList from './_conponents/courses-list'
const MeWishList = () => {
  return (
    <div className="section-wishlist-right section-right">
      <div className="row">
        <div className="border-bottom">
          <div className="header-search grow">
            <h6 className="fw-5 fs-22 wow fadeInUp">Favorite Courses</h6>
          </div>
          <div className="sort-by-wrap">
            <MeSort />
          </div>
        </div>
      </div>
      <section className="section-inner">
        <CoursesList />
        <div className="row">
          <ul className="wg-pagination justify-center">
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
      </section>
    </div>
  )
}

export default MeWishList
