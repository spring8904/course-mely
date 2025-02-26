import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Gift,
  Home,
  Receipt,
  Shield,
} from 'lucide-react'

import PaymentSupport from '@/sections/payment/_components/payment-support'

const orderNumber = 'ORD-2024-03-15-789'
const amount = '1,290,000'

const PaymentSuccessView = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1')] bg-cover bg-center opacity-5" />
      <div className="relative z-10 w-full max-w-xl space-y-6">
        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <div className="animate-gradient relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 text-white">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926')] bg-cover bg-center opacity-10 mix-blend-overlay" />
            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <div className="animate-[bounce_5s_ease-in-out_infinite] rounded-xl bg-white/20 p-3 shadow-lg">
                  <CheckCircle className="size-8" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Thanh toán thành công
                  </h2>
                  <p className="mt-1 text-sm text-emerald-50">
                    Cảm ơn bạn đã tin tưởng lựa chọn chúng tôi
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6">
            <div className="py-6 text-center">
              <p className="mb-1 text-sm text-slate-600">Số tiền thanh toán</p>
              <div className="animate-gradient-fast bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-3xl font-bold text-transparent">
                {amount} ₫
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="group rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white p-2 shadow-sm transition-all duration-300 group-hover:shadow-md">
                    <Receipt
                      className="size-4 text-slate-600"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-xs font-medium text-slate-500">
                      Mã đơn hàng
                    </p>
                    <p className="font-mono text-sm font-medium text-slate-700">
                      {orderNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white p-2 shadow-sm transition-all duration-300 group-hover:shadow-md">
                    <Calendar
                      className="size-4 text-slate-600"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-xs font-medium text-slate-500">
                      Thời gian
                    </p>
                    <p className="text-sm font-medium text-slate-700">
                      {new Date().toLocaleString('vi-VN')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white p-2 shadow-sm transition-all duration-300 group-hover:shadow-md">
                    <CreditCard
                      className="size-4 text-slate-600"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-xs font-medium text-slate-500">
                      Phương thức
                    </p>
                    <p className="text-sm font-medium text-slate-700">
                      Thẻ tín dụng
                    </p>
                  </div>
                </div>
              </div>

              <div className="group rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white p-2 shadow-sm transition-all duration-300 group-hover:shadow-md">
                    <CheckCircle
                      className="size-4 text-slate-600"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-xs font-medium text-slate-500">
                      Trạng thái
                    </p>
                    <p className="text-sm font-medium text-slate-700">
                      Đã thanh toán
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="cursor-pointer space-y-1.5 rounded-xl bg-emerald-50 p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-100">
                <Shield className="mx-auto size-5 text-emerald-600" />
                <p className="text-xs font-medium text-emerald-900">
                  Bảo mật tuyệt đối
                </p>
              </div>
              <div className="cursor-pointer space-y-1.5 rounded-xl bg-blue-50 p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-blue-100">
                <Clock className="mx-auto size-5 text-blue-600" />
                <p className="text-xs font-medium text-blue-900">
                  Truy cập ngay
                </p>
              </div>
              <div className="cursor-pointer space-y-1.5 rounded-xl bg-purple-50 p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-purple-100">
                <Gift className="mx-auto size-5 text-purple-600" />
                <p className="text-xs font-medium text-purple-900">
                  Ưu đãi độc quyền
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Link href="/my-courses">
                <button className="animate-gradient group w-full rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-4 py-3 text-sm font-medium text-white shadow-sm shadow-emerald-100 transition-all duration-300 hover:-translate-y-0.5">
                  <span className="flex items-center justify-center gap-2">
                    <BookOpen className="size-4" strokeWidth={1.5} />
                    <span>Truy cập khoá học</span>
                    <ArrowRight
                      className="size-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      strokeWidth={1.5}
                    />
                  </span>
                </button>
              </Link>

              <Link href="/">
                <button className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50">
                  <span className="flex items-center justify-center gap-2">
                    <Home className="size-4 text-slate-500" strokeWidth={1.5} />
                    <span>Quay về trang chủ</span>
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <PaymentSupport />
      </div>
    </div>
  )
}
export default PaymentSuccessView
