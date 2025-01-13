import React from 'react'
import { manropeFont } from '@/components/common/fonts'
import QueryProvider from '@/components/layouts/QueryProvider'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${manropeFont.className} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}

export default Layout
