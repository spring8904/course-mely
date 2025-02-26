import ProtectedRoute from '@/components/shared/protected-route'

interface LayoutProps {
  children?: React.ReactNode
}

const CommonLayout = ({ children }: LayoutProps) => {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

export default CommonLayout
