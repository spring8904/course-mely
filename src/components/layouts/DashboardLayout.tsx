import React from 'react'

import { ISidebarData } from '@/types'

import TopBar from '@/components/layouts/TopBar'
import { AppSidebar } from '@/components/shared/app-sidebar'
import ProgressBar from '@/components/shared/ProgressBar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { cookies } from 'next/headers'

interface LayoutProps {
  children?: React.ReactNode
  leftSidebarData: ISidebarData[]
}

const DashboardLayout = async ({ children }: LayoutProps) => {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
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
