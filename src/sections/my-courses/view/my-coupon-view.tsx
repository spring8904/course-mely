'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Gift, Calendar, Clock, Tag } from 'lucide-react'

import { formatCurrency } from '@/lib/common'
import { useGetCouponUser } from '@/hooks/user/useUser'
import Link from 'next/link'

const MyCouponView = () => {
  const [coupon, setMyCoupon] = useState<any[]>([])

  const { data: couponData, isLoading } = useGetCouponUser()

  useEffect(() => {
    if (!isLoading && couponData) {
      setMyCoupon(couponData?.data)
    }
  }, [couponData, isLoading])

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="size-10 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  return (
    <section className="section-inner max-w-7xl py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Mã giảm giá của tôi
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Quản lý và sử dụng các mã giảm giá hiện có của bạn.
        </p>
      </div>

      {coupon.length === 0 ? (
        <div className="flex h-[30vh] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <Gift className="mb-4 size-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            Chưa có mã giảm giá
          </h3>
          <p className="text-sm text-gray-500">
            Bạn chưa có mã giảm giá nào. Hãy tiếp tục mua khóa học để nhận được
            các ưu đãi.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {coupon.map((coupon) => (
            <div
              key={coupon.coupon.id}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="absolute -right-12 -top-12 size-24 rotate-45 bg-gradient-to-br from-blue-500 to-blue-600 opacity-20"></div>

              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="size-4 text-blue-500" />
                    <h4 className="font-mono text-sm font-medium text-blue-600">
                      {coupon.coupon.code}
                    </h4>
                  </div>
                  {coupon.coupon.discount_type === 'percentage' ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      {coupon.coupon.discount_value}%
                    </span>
                  ) : (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                      {formatCurrency(coupon.coupon.discount_value)}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="size-4 text-gray-400" />
                    <span>Ngày áp dụng:</span>
                    <span className="font-medium text-gray-900">
                      {coupon.applied_at}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="size-4 text-gray-400" />
                    <span>Hết hạn:</span>
                    <span
                      className={`font-medium ${coupon.expired_at ? 'text-gray-900' : 'italic text-gray-500'}`}
                    >
                      {coupon.expired_at || 'Không giới hạn'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-2 border-t border-gray-100 bg-gray-50 px-6 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase text-gray-500">
                    {coupon.coupon.discount_type === 'percentage'
                      ? 'Giảm theo %'
                      : 'Giảm trực tiếp'}
                  </span>
                  <Link href="/courses">
                    <button className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100">
                      Sử dụng ngay
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default MyCouponView
