import React from 'react'

import { ICourseFilter, SortType } from '@/types'

const sortOptions: { label: string; value: SortType }[] = [
  { label: 'Giá tăng dần', value: 'price_asc' },
  { label: 'Giá giảm dần', value: 'price_desc' },
]

type Props = {
  dataFilters: ICourseFilter
  setDataFilters: React.Dispatch<React.SetStateAction<ICourseFilter>>
}

export const SortByDropdown = ({ dataFilters, setDataFilters }: Props) => {
  const handleSortChange = (newSort: SortType) => {
    setDataFilters((prev) => {
      const updatedFilters = {
        ...prev,
        sort_by: prev.sort_by === newSort ? undefined : newSort,
      }

      localStorage.setItem('courseFilters', JSON.stringify(updatedFilters))

      return updatedFilters
    })
  }

  return (
    <div className="d-flex">
      <p className="text text-2 wow fadeInUp ps-0" data-wow-delay="0.1s">
        Lọc theo
      </p>
      <div
        className="nice-select default wow fadeInUp"
        data-wow-delay="0.1s"
        tabIndex={0}
      >
        <span className="current text text-1">
          {dataFilters.sort_by === 'price_asc'
            ? 'Giá tăng dần'
            : dataFilters.sort_by === 'price_desc'
              ? 'Giá giảm dần'
              : 'Chọn sắp xếp'}
        </span>
        <ul className="list">
          {sortOptions.map((option) => (
            <li
              key={option.value}
              className={`option text text-1 ${dataFilters.sort_by === option.value ? 'selected' : ''}`}
              onClick={() => handleSortChange(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
