import { manropeFont } from '@/components/common/fonts'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${manropeFont.className} antialiased`}>{children}</body>
    </html>
  )
}
