import { Metadata } from 'next'

import { SignupView } from '@/sections/signup/view'

export const metadata: Metadata = {
  title: 'Đăng ký và bắt đầu học',
}

const Signup = () => {
  return <SignupView />
}

export default Signup
