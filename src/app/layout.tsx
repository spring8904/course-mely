import { Metadata } from 'next'

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
export const metadata: Metadata = {
  title: 'CourseMeLy - Nền tảng học trực tuyến hàng đầu Việt Nam',
  description:
    '"Nền tảng trực tuyến với đa dạng khóa học từ cơ bản đến nâng cao với nhiều chuyên ngành' +
    'khác nhau, giúp bạn dễ dàng học tập mọi lúc mọi nơi. Được phát triển bởi CourseMeLy"',
  keywords: 'course, online, elearning, education, learning, platform',
  applicationName: 'CourseMeLy',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    title: 'CourseMeLy',
    images: [
      {
        url: '/images/logo/logo.svg',
        width: 400,
        height: 400,
        alt: 'CourseMeLy',
      },
    ],
  },
}
