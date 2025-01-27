import React from 'react'
import { CourseManageView } from '@/sections/instructor/view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quản lý khóa học',
}

const CourseManagePage = () => {
  return <CourseManageView />
}

export default CourseManagePage
