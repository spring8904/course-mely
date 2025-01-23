import CommonLayout from '@/components/layouts/CommonLayout'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return <CommonLayout>{children}</CommonLayout>
}
export default Layout
