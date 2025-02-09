import React from 'react'
import { ToastContainer } from 'react-toastify'

import { ISidebarData, IUser, UserStatus } from '@/types'

import { AppSidebar } from '@/components/ui/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { manropeFont } from '@/components/common/fonts'
import TopBar from '@/components/layouts/TopBar'

import QueryProvider from './QueryProvider'

interface LayoutProps {
  children?: React.ReactNode
  leftSidebarData: ISidebarData[]
}

const DashboardLayout = ({ children }: LayoutProps) => {
  const user: IUser = {
    id: 1,
    code: 'USR001',
    name: 'John Doe',
    email: 'johndoe@example.com',
    emailVerifiedAt: new Date('2024-12-25T12:00:00Z'),
    password: 'securepassword123',
    avatar: 'https://example.com/avatar.jpg',
    verificationToken: 'abc123xyz',
    rememberToken: 'token56789',
    status: UserStatus.Active,
    deletedAt: null,
    createdAt: new Date('2024-01-01T09:00:00Z'),
    updatedAt: new Date('2024-12-27T15:30:00Z'),
  }

  return (
    <html lang="en">
      <body className={`${manropeFont.className} antialiased`}>
        <QueryProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <TopBar userData={user} />
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
              </div>
              <ToastContainer newestOnTop className={'py-8'} />
            </SidebarInset>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  )
}

export default DashboardLayout
