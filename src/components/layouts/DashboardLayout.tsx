import { manropeFont } from '@/components/common/fonts'
import React from 'react'
import LeftSidebar from './LeftSidebar'
import QueryProvider from './QueryProvider'
import TopSidebar from './TopSidebar'
import { IUser, UserStatus } from '@/types'

interface LayoutProps {
  children?: React.ReactNode
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
          <div className="grid min-h-screen grid-cols-12">
            {/* Sidebar */}
            <div className="col-span-3">
              <LeftSidebar />
            </div>

            {/* Main Content */}
            <main className="col-span-9 bg-gray-100">
              <TopSidebar userData={user} />
              <div className="px-10 py-5">{children}</div>
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  )
}

export default DashboardLayout
