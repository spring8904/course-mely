import React from 'react'

import { Role } from '@/constants/role'

import ProtectedRoute from '@/components/shared/protected-route'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ProtectedRoute roles={[Role.MEMBER]}>{children}</ProtectedRoute>
}

export default Layout
