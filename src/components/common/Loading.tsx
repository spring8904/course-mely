'use client'

import { motion } from 'motion/react'

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <motion.div
        className="relative flex size-16 items-center justify-center rounded-lg p-6 "
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute size-3 rounded-full bg-[#E27447]"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 60}deg) translate(30px)`,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default Loading
