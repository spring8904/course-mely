import React from 'react'

import { leftSidebarStudentData } from '@/configs'

import DashboardLayout from '@/components/layouts/DashboardLayout'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout leftSidebarData={leftSidebarStudentData}>
      {children}
    </DashboardLayout>
  )
}

export default layout
