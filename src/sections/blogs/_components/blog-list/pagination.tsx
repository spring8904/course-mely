import React from 'react'

const BlogListPagination = () => {
  return (
    <div>
      {/* phan trang */}
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
  )
}

export default BlogListPagination
