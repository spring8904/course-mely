import CouponUpdateView from '@/sections/instructor/components/coupon/coupon-update-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cập nhật mã giảm giá',
}

type Props = {
  params: { id: string }
}

const Page = ({ params }: Props) => {
  const { id } = params
  return <CouponUpdateView id={id} />
}

export default Page
