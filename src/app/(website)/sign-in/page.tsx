import { Metadata } from 'next'

import SigninView from '@/sections/signin/view/signin-view'

export const metadata: Metadata = {
  title: 'Đăng nhập để tiếp tục hành trình học tập của bạn',
}

const page = () => {
  return <SigninView />
}

export default page
