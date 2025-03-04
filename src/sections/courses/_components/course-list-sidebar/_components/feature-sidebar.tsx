import React from 'react'

import { FeatureType, ICourseFilter } from '@/types'

const featureOptions: {
  label: string
  value: FeatureType
}[] = [
  { label: 'Tài liệu', value: 'document' },
  { label: 'Video', value: 'video' },
  { label: 'Lập trình', value: 'coding' },
  { label: 'Câu đố', value: 'quiz' },
]

type Props = {
  dataFilters: ICourseFilter
  setDataFilters: React.Dispatch<React.SetStateAction<ICourseFilter>>
}

export const FeatureSidebar = ({ dataFilters, setDataFilters }: Props) => {
  const handleFeatureChange = (feature: FeatureType, checked: boolean) => {
    setDataFilters((prev) => {
      const currentFeatures = prev.features || []
      const newFeatures = checked
        ? [...currentFeatures, feature]
        : currentFeatures.filter((f) => f !== feature)

      const newFilters = { ...prev, features: newFeatures }

      localStorage.setItem('courseFilters', JSON.stringify(newFilters))

      return newFilters
    })
  }

  return (
    <div className="sidebar-item widget wg-categorie tf-collapse-item">
      <div className="sidebar-title tf-collapse-title">
        <h5 className="fw-5">Loại nội dung học tập</h5>
        <i className="tf-collapse-icon icon-arrow-top" />
      </div>
      <ul className="tf-collapse-content">
        {featureOptions.map((item) => (
          <li key={item.value} className="checkbox-item">
            <label>
              <p>{item.label}</p>
              <input
                name="input-features"
                type="checkbox"
                checked={dataFilters.features?.includes(item.value) ?? false}
                onChange={(e) =>
                  handleFeatureChange(item.value, e.target.checked)
                }
              />
              <span className="btn-checkbox" />
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
