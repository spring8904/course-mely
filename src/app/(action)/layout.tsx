import React from 'react'

import DashboardLayout from '@/components/layouts/DashboardLayout'
import ProtectedRoute from '@/components/shared/protected-route'
import { Role } from '@/constants/role'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute roles={[Role.INSTRUCTOR]}>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  )
}

export default layout
