'use client'

import { useState } from 'react'
import Sidebar from '../_components/student-sidebar'

const StudentsDashBoardView = () => {
  const [content, setContent] = useState<React.ReactNode>(null)
  console.log('Current Content:', content)
  return (
    <div className="flex">
      <Sidebar
        onSelect={(component) => {
          console.log('Selected Component:', component)
          setContent(component)
        }}
      />
      <main className="flex-1 p-6">{content || <div>khong dc r</div>}</main>
    </div>
  )
}

export default StudentsDashBoardView
