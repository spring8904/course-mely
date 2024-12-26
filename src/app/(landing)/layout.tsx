import { Metadata } from 'next'

interface LayoutProps {
  children?: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Elearning Platform',
  description: 'Chào mừng bạn đã đến với nền tảng học tập của chúng tôi',
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <main>{children}</main>
    </div>
  )
}
export default Layout
