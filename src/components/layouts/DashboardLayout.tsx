import { manropeFont } from '@/components/common/fonts'
import QueryProvider from './QueryProvider'

interface LayoutProps {
  children?: React.ReactNode
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body className={`${manropeFont.className} antialiased`}>
        <QueryProvider>
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 p-4 text-white">
              <h1 className="mb-8 text-2xl font-bold">Menu</h1>
              <ul className="space-y-4">
                <li className="cursor-pointer rounded-lg p-2 hover:bg-gray-700">
                  Dashboard
                </li>
                <li className="cursor-pointer rounded-lg p-2 hover:bg-gray-700">
                  Products
                </li>
                <li className="cursor-pointer rounded-lg p-2 hover:bg-gray-700">
                  Orders
                </li>
                <li className="cursor-pointer rounded-lg p-2 hover:bg-gray-700">
                  Customers
                </li>
                <li className="cursor-pointer rounded-lg p-2 hover:bg-gray-700">
                  Reports
                </li>
              </ul>
            </div>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-6">
              <div className="rounded-lg bg-white p-6 shadow-md">
                {children}
              </div>
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  )
}

export default DashboardLayout
