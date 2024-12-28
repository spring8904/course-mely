import DashboardLayout from '@/components/layouts/DashboardLayout'
import { leftSidebarStudentData } from '@/configs'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout leftSidebarData={leftSidebarStudentData}>
      {children}
    </DashboardLayout>
  )
}

export default layout
