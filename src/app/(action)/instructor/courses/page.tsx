import React from 'react'
import { Metadata } from 'next'

import { CourseManageView } from '@/sections/instructor/view'

export const metadata: Metadata = {
  title: 'Quản lý khóa học',
}

const CourseManagePage = () => {
  return <CourseManageView />
}

export default CourseManagePage
