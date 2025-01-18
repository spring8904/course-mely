import { manropeFont } from '@/components/common/fonts'
import Footer from './Footer'
import QueryProvider from './QueryProvider'
import Header from '@/components/themes/Header'
import HeadLinks from '@/components/themes/HeadLinks'
import HeadScripts from '@/components/themes/HeadScripts'
import '@/components/themes/assetsImports'

interface LayoutProps {
  children?: React.ReactNode
}

const CommonLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <HeadLinks />
      <body className={`${manropeFont.className} counter-scroll antialiased`}>
        <div id="wrapper">
          <QueryProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </QueryProvider>
        </div>
      </body>
      <HeadScripts />
    </html>
  )
}

export default CommonLayout
