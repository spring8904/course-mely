import React from 'react'

import { ICourseFilter } from '@/types'

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 !== 0

  return (
    <div className="ratings">
      {[...Array(fullStars)].map((_, i) => (
        <i key={i} className="icon-star-1" />
      ))}
      {halfStar && (
        <svg
          width={12}
          height={11}
          viewBox="0 0 12 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.54831 7.10382L3.58894 6.85477L3.41273 6.67416L1.16841 4.37373L4.24914 3.90314L4.51288 3.86286L4.62625 3.62134L5.99989 0.694982L7.37398 3.62182L7.48735 3.86332L7.75108 3.9036L10.8318 4.37419L8.58749 6.67462L8.41128 6.85523L8.4519 7.10428L8.98079 10.3465L6.24201 8.8325L6.00014 8.69879L5.75826 8.83247L3.01941 10.3461L3.54831 7.10382Z"
            stroke="#131836"
          />
        </svg>
      )}
    </div>
  )
}

type Props = {
  dataFilters: ICourseFilter
  setDataFilters: React.Dispatch<React.SetStateAction<ICourseFilter>>
}

const ratings = [5, 4, 3, 2, 1]

export const RatingSidebar = ({ dataFilters, setDataFilters }: Props) => {
  const handleRatingChange = (rating: number) => {
    setDataFilters((prev) => {
      const newFilters = {
        ...prev,
        rating: rating === prev.rating ? undefined : rating,
      }

      localStorage.setItem('courseFilters', JSON.stringify(newFilters))

      return newFilters
    })
  }

  return (
    <div className="sidebar-item widget wg-categorie tf-collapse-item">
      <div className="sidebar-title tf-collapse-title">
        <h5 className="fw-5">Đánh giá</h5>
        <i className="tf-collapse-icon icon-arrow-top" />
      </div>
      <ul className="tf-collapse-content">
        {ratings.map((rating) => (
          <li key={rating} className="checkbox-item">
            <label>
              {renderStars(rating)}
              <input
                name="input-ratings"
                type="radio"
                checked={dataFilters.rating === rating}
                onChange={() => handleRatingChange(rating)}
              />
              <span className="btn-radio" />
            </label>
            <span>{rating}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
