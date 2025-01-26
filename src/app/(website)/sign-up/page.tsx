import { SignupView } from '@/sections/signup/view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Đăng ký và bắt đầu học',
}

const Signup = () => {
  return <SignupView />
}

export default Signup
