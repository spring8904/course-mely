import { manropeFont } from '@/components/common/fonts'
import QueryProvider from '@/components/layouts/QueryProvider'

interface LayoutProps {
  children?: React.ReactNode
}

const CommonLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body className={`${manropeFont.className} antialiased`}>
        <QueryProvider>
          <main className="min-h-screen">{children}</main>
        </QueryProvider>
      </body>
    </html>
  )
}

export default CommonLayout
