import React from 'react'
import { Metadata } from 'next'

import { Role } from '@/constants/role'

import ProtectedRoute from '@/components/shared/protected-route'
import BecomeAnInstructor from '@/sections/become-an-instructor/views/become-an-instructor'

export const metadata: Metadata = {
  title: 'Trở thành giảng viên',
}

const page = () => {
  return (
    <ProtectedRoute roles={[Role.MEMBER]}>
      <BecomeAnInstructor />
    </ProtectedRoute>
  )
}

export default page
