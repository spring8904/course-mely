'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'

import { Role } from '@/constants/role'

interface Props {
  roles?: Role[]
  children: React.ReactNode
}

const ProtectedRoute: React.FC<Props> = ({ roles = [], children }) => {
  const { isAuthenticated, role } = useAuthStore()
  const router = useRouter()

  const permission = useMemo(() => {
    return roles.length
      ? [...roles, Role.SUPER_ADMIN]
      : [Role.SUPER_ADMIN, Role.ADMIN, Role.INSTRUCTOR, Role.MEMBER]
  }, [roles])

  const authorized = isAuthenticated && role && permission.includes(role)

  useEffect(() => {
    if (!isAuthenticated) {
      return router.replace('/sign-in')
    }

    if (!authorized) {
      return router.replace('/forbidden')
    }
  }, [authorized, isAuthenticated, router])

  return authorized ? <>{children}</> : null
}

export default ProtectedRoute
