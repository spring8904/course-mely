import QueryProvider from '@/providers/query-provider'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>
}

export default Layout
