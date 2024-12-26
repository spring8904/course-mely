
import { manropeFont } from '@/components/common/fonts'
import Footer from './Footer'
import Header from './Header'
import QueryProvider from './QueryProvider'

interface LayoutProps {
  children?: React.ReactNode
}

const CommonLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body className={`${manropeFont.className} antialiased`}>
        <QueryProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}

export default CommonLayout
