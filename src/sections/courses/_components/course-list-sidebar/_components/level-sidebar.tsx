import React from 'react'

import { ICourseFilter, LevelType } from '@/types'

const levelOptions: { label: string; value: LevelType }[] = [
  { label: 'Dễ', value: 'beginner' },
  { label: 'Trung bình', value: 'intermediate' },
  { label: 'Nâng cao', value: 'advanced' },
]

type Props = {
  dataFilters: ICourseFilter
  setDataFilters: React.Dispatch<React.SetStateAction<ICourseFilter>>
}

export const LevelSidebar = ({ dataFilters, setDataFilters }: Props) => {
  const handleLevelChange = (level: LevelType) => {
    setDataFilters((prev) => {
      const newLevels = prev.levels?.includes(level)
        ? prev.levels.filter((l) => l !== level)
        : [...(prev.levels || []), level]

      const newFilters = { ...prev, levels: newLevels }

      localStorage.setItem('courseFilters', JSON.stringify(newFilters))

      return newFilters
    })
  }

  return (
    <div className="sidebar-item widget wg-categorie tf-collapse-item">
      <div className="sidebar-title tf-collapse-title">
        <h5 className="fw-5">Cấp độ</h5>
        <i className="tf-collapse-icon icon-arrow-top" />
      </div>
      <ul className="tf-collapse-content">
        {levelOptions.map((level) => (
          <li key={level.value} className="checkbox-item">
            <label>
              <p>{level.label}</p>
              <input
                name="input-level"
                type="checkbox"
                checked={dataFilters.levels?.includes(level.value) ?? false}
                onChange={() => handleLevelChange(level.value)}
              />
              <span className="btn-checkbox" />
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
