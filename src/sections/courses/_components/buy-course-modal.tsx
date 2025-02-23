import * as process from 'node:process'
import React, { useState } from 'react'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { toast } from 'react-toastify'

import { formatDuration, formatNumber } from '@/lib/common'
import { useCreateVNPayPayment } from '@/hooks/vn-pay/useVnPay'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface BuyCourseModalProps {
  course: {
    id: string
    thumbnail: string
    name: string
    price: number
    price_sale: number
    chapters_count: string
    lessons_count: string
    total_video_duration: number
    user: {
      id: string
      name: string
      avatar: string
      created_at: string
    }
  }
  isOpen: boolean
  onClose: () => void
}

const paymentMethods = [
  {
    id: 'vnpay',
    name: 'VNPay',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s',
  },
  {
    id: 'momo',
    name: 'Momo',
    icon: 'https://play-lh.googleusercontent.com/uCtnppeJ9ENYdJaSL5av-ZL1ZM1f3b35u9k8EOEjK3ZdyG509_2osbXGH5qzXVmoFv0',
  },
  {
    id: 'credit-card',
    name: 'Thẻ tín dụng',
    icon: '/images/payment/credit-card.png',
  },
]

const validDiscountCodes = [
  { code: 'DISCOUNT10', type: 'percent', value: 10 }, // Giảm 10%
  { code: 'DISCOUNT20', type: 'percent', value: 20 }, // Giảm 20%
  { code: 'SALE50000', type: 'fixed', value: 50000 }, // Giảm 50,000 VND
]

const BuyCourseModal = ({ course, isOpen, onClose }: BuyCourseModalProps) => {
  const [discountCode, setDiscountCode] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [finalPrice, setFinalPrice] = useState(
    course.price_sale > 0 ? course.price_sale : course.price
  )

  const { mutate: createVNPayPayment, isPending: isPendingCreateVNPayPayment } =
    useCreateVNPayPayment()

  const handleApplyDiscount = () => {
    const validCode = validDiscountCodes.find((dc) => dc.code === discountCode)
    if (validCode) {
      let discount = 0
      const basePrice = course.price_sale > 0 ? course.price_sale : course.price

      if (validCode.type === 'percent') {
        discount = (basePrice * validCode.value) / 100
      } else if (validCode.type === 'fixed') {
        discount = validCode.value
      }

      const newFinalPrice = Math.max(basePrice - discount, 0)

      setDiscountAmount(discount)
      setFinalPrice(newFinalPrice)
      setDiscountApplied(true)

      setDiscountCode('')
    } else {
      setDiscountAmount(0)
      setFinalPrice(course.price_sale > 0 ? course.price_sale : course.price)
      setDiscountApplied(false)
      alert('Mã giảm giá không hợp lệ')
    }
  }

  const handlePayment = (e: any) => {
    e.preventDefault()

    if (!selectedPaymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán')
      return
    }

    switch (selectedPaymentMethod) {
      case 'vnpay':
        const paymentData = {
          amount: finalPrice,
          course_id: `${course.id}`,
          coupon_code: ``,
        }

        console.log('Data sent to backend:', paymentData)

        createVNPayPayment(paymentData, {
          onSuccess: (res: any) => {
            window.location.href = res.data
          },
          onError: (res: any) => {
            onClose()
            toast.warning(res.message)
          },
        })

        break

      case 'momo':
        alert('Phương thức thanh toán Momo đang được phát triển')
        break

      case 'credit-card':
        alert('Phương thức thanh toán thẻ tín dụng đang được phát triển')
        break

      default:
        alert('Phương thức thanh toán không hợp lệ')
    }

    console.log('Selected payment method:', selectedPaymentMethod)
    console.log('Discount code:', discountCode)
    console.log('Final price:', finalPrice)
    // onClose()
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            zIndex: 9999, // Đảm bảo toast hiển thị trên modal
          },
        }}
      />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <DialogHeader>
                <DialogTitle>Thông tin khoá học</DialogTitle>
                <DialogDescription>Xác nhận mua khoá học</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <Image
                  src={course.thumbnail}
                  alt={course.name}
                  width={400}
                  height={225}
                  className="rounded-lg object-cover"
                />
                <p className="mt-4 text-xl font-semibold">{course.name}</p>
                <ul className="my-2">
                  <li className="flex items-center gap-2">
                    <i className="flaticon-play-1" />
                    <p>{formatDuration(course?.total_video_duration ?? 0)}</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="flaticon-document" />
                    <p>{course?.lessons_count} bài học</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="icon-extremely" />
                    <p>Truy cập chọn đời</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="flaticon-medal" />
                    <p>Cấp chứng chỉ khi hoàn thành</p>
                  </li>
                </ul>
                <div className="mt-2 flex items-center space-x-2">
                  <Image
                    width={30}
                    height={30}
                    src={course.user.avatar}
                    alt={course.user.name}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <span className="text-sm text-gray-600">
                      By {course.user.name}
                    </span>
                    <span className="block text-xs text-gray-400">
                      Tham gia{' '}
                      {format(parseISO(course.user.created_at), 'dd/MM/yyyy')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <DialogHeader>
                <DialogTitle>Thông tin thanh toán</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="price">Số tiền gốc</Label>
                  <Input
                    id="price"
                    value={`${formatNumber(course.price_sale > 0 ? course.price_sale : course.price)} VND`}
                    readOnly
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="discount">Mã giảm giá</Label>
                  <div className="flex gap-2">
                    <Input
                      id="discount"
                      placeholder="Nhập mã giảm giá"
                      value={discountCode}
                      onChange={(e) => {
                        setDiscountCode(e.target.value) // Cập nhật mã mới
                        setDiscountApplied(false) // Xóa trạng thái mã cũ
                        setDiscountAmount(0) // Reset giảm giá về 0
                      }}
                      className="mt-1 flex-1"
                    />
                    <Button onClick={handleApplyDiscount} className="mt-1">
                      Áp dụng
                    </Button>
                  </div>
                </div>

                {discountApplied && (
                  <div>
                    <Label>Giảm giá</Label>
                    <Input
                      value={`-${formatNumber(discountAmount)} VND`}
                      readOnly
                      className="mt-1 text-red-500"
                    />
                  </div>
                )}

                <div>
                  <Label>Số tiền thanh toán</Label>
                  <Input
                    value={`${formatNumber(finalPrice)} VND`}
                    readOnly
                    className="mt-1 font-semibold text-green-600"
                  />
                </div>

                <div>
                  <Label>Hình thức thanh toán</Label>
                  <div className="mt-2 grid grid-cols-3 gap-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-primary ${
                          selectedPaymentMethod === method.id
                            ? 'border-primary shadow'
                            : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                      >
                        <Image
                          src={method.icon}
                          alt={method.name}
                          width={80}
                          height={50}
                          className="mx-auto"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                disabled={isPendingCreateVNPayPayment}
                onClick={handlePayment}
                className="mt-6 w-full"
              >
                {isPendingCreateVNPayPayment ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" /> Loading...
                  </div>
                ) : (
                  'Thanh toán'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BuyCourseModal
