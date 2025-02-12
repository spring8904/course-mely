import React from 'react'
import { Metadata } from 'next'

import ProtectedRoute from '@/components/shared/protected-route'
import BecomeAnInstructor from '@/sections/become-an-instructor/views/become-an-instructor'

export const metadata: Metadata = {
  title: 'Trở thành giảng viên',
}

const page = () => {
  return (
    <ProtectedRoute>
      <BecomeAnInstructor />
    </ProtectedRoute>
  )
}

export default page
