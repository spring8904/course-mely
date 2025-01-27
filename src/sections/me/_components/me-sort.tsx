import React from 'react'

const MeSort = () => {
  return (
    <div className="sort-wrap">
      <p className="text text-2 wow fadeInUp" data-wow-delay="0.1s">
        Sort by
      </p>
      <div
        className="nice-select default wow fadeInUp"
        data-wow-delay="0.1s"
        tabIndex={0}
      >
        <span className="current text text-1">Date6 Created</span>
        <ul className="list">
          <li data-value className="option selected text text-1">
            Date Created
          </li>
          <li data-value="For Ren" className="option text text-1">
            Oldest
          </li>
          <li data-value="Sold" className="option text text-1">
            3 days
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MeSort
