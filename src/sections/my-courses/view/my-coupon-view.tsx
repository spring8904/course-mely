import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { formatCurrency, formatPercentage } from '@/lib/common'
import { useGetCouponUser } from '@/hooks/user/useUser'

const MyCouponView = () => {
  const [coupon, setMyCoupon] = useState<any[]>([])

  const { data: couponData, isLoading } = useGetCouponUser()

  useEffect(() => {
    if (!isLoading && couponData) {
      setMyCoupon(couponData?.data)
    }
  }, [couponData, isLoading])

  return (
    <>
      {isLoading && (
        <div className="mt-20">
          <Loader2 className="mx-auto size-8 animate-spin" />
        </div>
      )}
      <section className="section-inner mt-10">
        <div className="row mb-[50px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {coupon.map((coupon) => (
              <div
                key={coupon.coupon.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-mono text-blue-500">
                    Mã: {coupon.coupon.code}
                  </h4>
                  {coupon.coupon.discount_type === 'percentage' ? (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-600">
                      {coupon.coupon.discount_type === 'percentage'
                        ? `${coupon.coupon.discount_value}%`
                        : `Giảm ${formatPercentage(coupon.coupon.discount_value)}`}
                    </span>
                  ) : (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-600">
                      {coupon.coupon.discount_type === 'percentage'
                        ? `${coupon.coupon.discount_value}%`
                        : `Giảm ${formatCurrency(coupon.coupon.discount_value)}`}
                    </span>
                  )}
                </div>
                <p className="mb-2 text-gray-600">
                  Ngày áp dụng:{' '}
                  <span className="font-medium">{coupon.applied_at}</span>
                </p>
                <p className="mb-2 text-gray-600">
                  Ngày hết hạn:{' '}
                  <span className="font-medium">
                    {coupon.expired_at || 'Không có'}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default MyCouponView
