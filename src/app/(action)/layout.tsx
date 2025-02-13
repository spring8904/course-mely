import React from 'react'

import { Role } from '@/constants/role'
import { leftSidebarStudentData } from '@/configs'

import DashboardLayout from '@/components/layouts/DashboardLayout'
import ProtectedRoute from '@/components/shared/protected-route'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute roles={[Role.INSTRUCTOR, Role.ADMIN]}>
      <DashboardLayout leftSidebarData={leftSidebarStudentData}>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  )
}

export default layout
