'use client'

import React from 'react'

import { ISidebarData } from '@/types'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import TopBar from '@/components/layouts/TopBar'
import { AppSidebar } from '@/components/shared/app-sidebar'
import ProgressBar from '@/components/shared/ProgressBar'

interface LayoutProps {
  children?: React.ReactNode
  leftSidebarData: ISidebarData[]
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="overflow-auto">
        <TopBar />
        <ProgressBar />
        <div className="gap-4pt-0 flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
