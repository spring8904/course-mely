import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'

const LearningProcess = ({ value }: { value: number }) => {
  const radius = 18
  const strokeWidth = 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  useEffect(() => {
    if (value === 100) {
      showConfetti()
    }
  }, [value])

  const showConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  return (
    <svg width="44" height="44" viewBox="0 0 44 44" className="relative">
      <circle
        cx="22"
        cy="22"
        r={radius}
        stroke="#e6e6e6"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx="22"
        cy="22"
        r={radius}
        stroke={value === 100 ? '#4CAF50' : '#FC6441'}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          transition: 'stroke-dashoffset 0.3s',
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
        }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="10"
        fill={value === 100 ? '#4CAF50' : '#fff'}
      >
        {value}%
      </text>
    </svg>
  )
}

export default LearningProcess
