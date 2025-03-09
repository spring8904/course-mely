import CouponCreateView from '@/sections/instructor/components/coupon/coupon-create-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tạo mã giảm giá',
}

const Page = () => {
  return <CouponCreateView />
}

export default Page
