import React from 'react'
import BecomeAnInstructor from '@/sections/become-an-instructor/views/become-an-instructor'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trở thành giảng viên',
}

const page = () => {
  return (
    <>
      <BecomeAnInstructor />
    </>
  )
}

export default page
