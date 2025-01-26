import AccountView from '@/sections/account/view/account-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quản lý tài khoản',
}

const page = () => {
  return <AccountView />
}

export default page
