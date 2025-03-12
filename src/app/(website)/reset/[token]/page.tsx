import React from 'react'
import ResetView from '@/sections/reset/view/reset-view'

interface Props {
  params: {
    token: string
  }
}

export const metadata = {
  title: 'CourseMeLy - Thay đổi mật khẩu',
  description:
    'Thay đổi mật khẩu của bạn để bảo vệ tài khoản CourseMeLy. Cập nhật mật khẩu mới an toàn và dễ dàng trong vài bước đơn giản.',
}

const Page = ({ params }: Props) => {
  const { token } = params

  return <ResetView token={token} />
}

export default Page
