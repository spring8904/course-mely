import React from 'react'

import TopBar from '@/components/layouts/TopBar'
import { AppSidebar } from '@/components/shared/app-sidebar'
import ProgressBar from '@/components/shared/ProgressBar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { cookies } from 'next/headers'

interface LayoutProps {
  children?: React.ReactNode
}

const DashboardLayout = async ({ children }: LayoutProps) => {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset className="flex h-screen flex-col overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-auto">
          <ProgressBar />
          <div className="flex flex-1 flex-col gap-4 pt-0">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
