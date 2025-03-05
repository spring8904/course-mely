import React from 'react'

const instructors = [
  { name: 'Kathryn Murphy', count: 89 },
  { name: 'Eleanor Pena', count: 58 },
  { name: 'Theresa Webb', count: 135 },
  { name: 'Bessie Cooper', count: 87 },
  { name: 'Software Engineering', count: 163 },
  { name: 'Game Development', count: 87 },
  { name: 'Web Development', count: 432 },
  { name: 'Game Development', count: 87 },
  { name: 'Software Engineering', count: 163 },
]

export const InstructorSidebar = () => {
  return (
    <div className="sidebar-item widget wg-categorie tf-collapse-item">
      <div className="sidebar-title tf-collapse-title">
        <h5 className="fw-5">Người hướng dẫn</h5>
        <i className="tf-collapse-icon icon-arrow-top" />
      </div>
      <ul className="tf-collapse-content showmore-item2">
        {instructors.map((instructor, index) => (
          <li key={index} className="checkbox-item fl-item3">
            <label>
              <p>{instructor.name}</p>
              <input name="input-level" type="radio" />
              <span className="btn-checkbox" />
            </label>
            <span>({instructor.count})</span>
          </li>
        ))}
      </ul>
      <div className="btn-showmore2 showmore view-more-button2">
        <span className="title">
          Xem thêm <i className="icon icon-arrow-bottom" />
        </span>
      </div>
    </div>
  )
}
