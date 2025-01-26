import SigninView from '@/sections/signin/view/signin-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Đăng nhập để tiếp tục hành trình học tập của bạn',
}

const page = () => {
  return <SigninView />
}

export default page
