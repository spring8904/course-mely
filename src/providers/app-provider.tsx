import { ToastContainer } from 'react-toastify'

import QueryProvider from './query-provider'

type Props = {
  children: React.ReactNode
}

const AppProvider = ({ children }: Props) => {
  return (
    <QueryProvider>
      {children}
      <ToastContainer newestOnTop className="pl-8" />
    </QueryProvider>
  )
}

export default AppProvider
