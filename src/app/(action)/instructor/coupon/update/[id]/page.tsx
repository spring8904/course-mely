import React from 'react'

import CouponUpdateView from '@/sections/instructor/components/coupon/coupon-update-view'

type Props = {
  params: { id: string }
}

const Page = ({ params }: Props) => {
  const { id } = params
  return <CouponUpdateView id={id} />
}

export default Page
