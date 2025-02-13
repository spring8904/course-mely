import CommonLayout from '@/components/layouts/CommonLayout'
import HeadScripts from '@/components/themes/HeadScripts'

import '@/styles/themes.css'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <CommonLayout>{children}</CommonLayout>
      <HeadScripts />
    </>
  )
}
export default Layout
