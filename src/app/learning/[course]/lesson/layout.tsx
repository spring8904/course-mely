interface LayoutProps {
  children?: React.ReactNode
}

const CommonLayout = ({ children }: LayoutProps) => {
  return <main className="min-h-screen">{children}</main>
}

export default CommonLayout
