'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'

import '@/styles/nprogress.css'

NProgress.configure({ showSpinner: false })

const ProgressBar = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.start()
    const timer = setTimeout(() => NProgress.done(), 500)
    return () => {
      clearTimeout(timer)
      NProgress.done()
    }
  }, [pathname, searchParams])

  return null
}

export default ProgressBar
