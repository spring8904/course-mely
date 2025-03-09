import CouponView from '@/sections/instructor/view/coupon-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quản lý mã giảm giá',
}

const Page = () => {
  return <CouponView />
}

export default Page
