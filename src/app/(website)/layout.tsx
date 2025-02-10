import CommonLayout from '@/components/layouts/CommonLayout'
import HeadScripts from '@/components/themes/HeadScripts'

import '@/assets/css/themes.css'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <CommonLayout>
      {children}
      <HeadScripts />
    </CommonLayout>
  )
}
export default Layout
