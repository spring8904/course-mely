'use client'

import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import QueryProvider from './query-provider'

type Props = {
  children: React.ReactNode
}

const AppProvider = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <QueryProvider>
      {children}
      <ToastContainer newestOnTop className="pl-8" />
    </QueryProvider>
  )
}

export default AppProvider
