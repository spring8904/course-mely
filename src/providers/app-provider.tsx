'use client'

import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
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
      <ToastContainer newestOnTop closeOnClick />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            zIndex: 9999, // Đảm bảo toast hiển thị trên modal
          },
        }}
      />
    </QueryProvider>
  )
}

export default AppProvider
