'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

import CertificatePage from '@/app/(website)/my-courses/certificate/page'
import AllCoursesPage from '@/app/(website)/my-courses/page'
import WishlistPage from '@/app/(website)/my-courses/wishlist/page'

export default function MyCoursesLayout() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initialTab = searchParams.get('tab') || 'all'
  const [activeTab, setActiveTab] = useState<
    'all' | 'wishlist' | 'certificate'
  >(initialTab as 'all' | 'wishlist' | 'certificate')

  const handleTabChange = (tab: 'all' | 'wishlist' | 'certificate') => {
    setActiveTab(tab)
    router.push(`/my-courses?tab=${tab}`)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'all':
        return <AllCoursesPage />
      case 'wishlist':
        return <WishlistPage />
      case 'certificate':
        return <CertificatePage />
      default:
        return <AllCoursesPage />
    }
  }

  return (
    <>
      <div
        style={{
          backgroundColor: '#FFEFEA',
          padding: '20px 0',
        }}
      >
        <div className="tf-container">
          <h2 className="fw-7">Học tập của tôi</h2>
        </div>
        <div className="tf-container mt-4">
          <div className="flex gap-6">
            {[
              { id: 'all', label: 'Tất cả các khoá học' },
              { id: 'wishlist', label: 'Danh sách khoá học yêu thích' },
              { id: 'certificate', label: 'Chứng chỉ đã nhận' },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`relative py-2 text-[16px] transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'font-semibold text-black'
                    : 'text-gray-500'
                }`}
                onClick={() => handleTabChange(tab.id as any)}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-black"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="tf-container mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}
