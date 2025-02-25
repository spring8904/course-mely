import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ModalLoading = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="relative z-[9999] flex h-screen w-screen flex-col items-center justify-center bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="size-16 rounded-full border-4 border-orange-500 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
          <motion.p
            className="mt-2 text-lg font-semibold text-white"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            Đang tải...
          </motion.p>
        </motion.div>
        <div className="relative mt-2 flex items-center">
          <motion.div
            className="text-4xl"
            animate={{
              y: [0, -3, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.5,
              ease: 'easeInOut',
            }}
          >
            🏍️
          </motion.div>

          <motion.div
            className="absolute -right-8 text-2xl text-gray-400"
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 1.5],
              y: -10,
              x: 10,
            }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            💨
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ModalLoading
