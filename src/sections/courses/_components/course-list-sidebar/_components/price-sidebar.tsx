import React from 'react'

import { ICourseFilter, PriceType } from '@/types'

const priceOptions: {
  label: string
  value: PriceType
}[] = [
  { label: 'Miễn phí', value: 'free' },
  { label: 'Có phí', value: 'price' },
  { label: 'Giảm giá', value: 'price_sale' },
]

type Props = {
  dataFilters: ICourseFilter
  setDataFilters: React.Dispatch<React.SetStateAction<ICourseFilter>>
}

export const PriceSidebar = ({ dataFilters, setDataFilters }: Props) => {
  const handlePriceChange = (value: PriceType) => {
    setDataFilters((prev) => {
      const newFilters = {
        ...prev,
        price: prev.price === value ? undefined : value,
      }

      localStorage.setItem('courseFilters', JSON.stringify(newFilters))

      return newFilters
    })
  }

  return (
    <div className="sidebar-item widget wg-categorie tf-collapse-item">
      <div className="sidebar-title tf-collapse-title">
        <h5 className="fw-5">Giá</h5>
        <i className="tf-collapse-icon icon-arrow-top" />
      </div>
      <ul className="tf-collapse-content">
        {priceOptions.map((option) => (
          <li key={option.value} className="checkbox-item">
            <label>
              <p>{option.label}</p>
              <input
                name="input-price"
                type="radio"
                checked={dataFilters.price === option.value}
                onChange={() => handlePriceChange(option.value)}
              />
              <span className="btn-checkbox" />
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
