import React from 'react'

import { leftSidebarStudentData } from '@/configs'

import DashboardLayout from '@/components/layouts/DashboardLayout'
import ProtectedRoute from '@/components/shared/protected-route'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <DashboardLayout leftSidebarData={leftSidebarStudentData}>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  )
}

export default layout
