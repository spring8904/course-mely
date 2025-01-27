import React from 'react'
import { MeView } from '@/sections/me/view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thông tin cá nhân',
}

const MePage = () => {
  return (
    <div>
      <MeView />
    </div>
  )
}

export default MePage
