'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function LoadingModalExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-blue-500 px-5 py-3 text-white shadow-md transition-all hover:bg-blue-600"
      >
        Open Loading Modal
      </button>

      <AnimatePresence>
        {isOpen && <LoadingModal onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}

const LoadingModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-80 rounded-2xl bg-white p-6 text-center shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()} // Ngăn close khi click vào modal
      >
        <motion.div
          className="mb-4 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        >
          <Loader2 className="h-12 w-12 text-blue-500" />
        </motion.div>
        <p className="text-lg font-medium">Đang tải...</p>
      </motion.div>
    </motion.div>
  )
}
