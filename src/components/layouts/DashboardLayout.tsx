'use client'

import React from 'react'

import { ISidebarData } from '@/types'

import { AppSidebar } from '@/components/ui/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import TopBar from '@/components/layouts/TopBar'
import ProgressBar from '@/components/shared/ProgressBar'

interface LayoutProps {
  children?: React.ReactNode
  leftSidebarData: ISidebarData[]
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <TopBar />
        <ProgressBar />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
