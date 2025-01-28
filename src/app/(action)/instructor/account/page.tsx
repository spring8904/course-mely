import { Metadata } from 'next'

import AccountView from '@/sections/account/view/account-view'

export const metadata: Metadata = {
  title: 'Quản lý tài khoản',
}

const page = () => {
  return <AccountView />
}

export default page
