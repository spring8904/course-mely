import { useState } from 'react'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

import {
  formatCurrency,
  formatDuration,
  formatNumber,
  formatPercentage,
} from '@/lib/common'
import { useApplyCoupon } from '@/hooks/transation/useTransation'
import { useGetCouponUser } from '@/hooks/user/useUser'
import { useCreateVNPayPayment } from '@/hooks/vn-pay/useVnPay'

import { Badge } from '@/components/ui/badge'
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

const BuyCourseModal = ({ course, isOpen, onClose }: BuyCourseModalProps) => {
  const [discountCode, setDiscountCode] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [finalPrice, setFinalPrice] = useState(
    course.price_sale > 0 ? course.price_sale : course.price
  )
  const [isCouponApplied, setIsCouponApplied] = useState(false)
  const [hasDiscountCode, setHasDiscountCode] = useState(false)
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false)

  const { data: couponData, isLoading } = useGetCouponUser()
  const { mutate: createVNPayPayment, isPending: isPendingCreateVNPayPayment } =
    useCreateVNPayPayment()
  const { mutate: applyCoupon, isPending: isPendingApplyCoupon } =
    useApplyCoupon()

  const handleApplyDiscount = () => {
    if (!discountCode) {
      toast.warning('Vui lòng nhập mã giảm giá để áp dụng!')
      return
    }

    setIsCouponApplied(false)

    applyCoupon(
      {
        code: discountCode,
        amount: course.price_sale > 0 ? course.price_sale : course.price,
        course_id: course.id,
      },
      {
        onSuccess: (res: any) => {
          const { discount_amount, final_amount } = res.data
          setDiscountAmount(discount_amount)
          setFinalPrice(final_amount)
          setDiscountCode('')
          const appliedCoupon = couponData?.data?.find(
            (coupon: any) => coupon.coupon.code === discountCode
          )
          setSelectedCoupon(appliedCoupon)
          toast.success(res.message)
          setIsCouponApplied(true)
        },
        onError: (error: any) => {
          const errorMessage =
            error.message || 'Không thể áp dụng mã giảm giá. Vui lòng thử lại!'
          toast.error(errorMessage)
          setIsCouponApplied(false)
        },
      }
    )
  }

  const handleCouponSelection = (coupon: any) => {
    setDiscountCode(coupon.coupon.code)
    setIsCouponApplied(false)
    setHasDiscountCode(true)
    setDiscountAmount(0)
    setSelectedCoupon(null)
    setIsCouponModalOpen(false)
  }

  const handleDiscountCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(e.target.value)
    setIsCouponApplied(false)
    setHasDiscountCode(!!e.target.value)
    setDiscountAmount(0)
    setSelectedCoupon(null)
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
          coupon_code: selectedCoupon ? selectedCoupon.coupon.code : '',
        }

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
  }

  return (
    <>
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
                  <div className="flex items-center gap-2">
                    <Label htmlFor="discount">Mã giảm giá</Label>
                    <Badge
                      className="cursor-pointer"
                      onClick={() => setIsCouponModalOpen(true)}
                    >
                      Chọn mã
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="discount"
                      placeholder="Nhập mã giảm giá"
                      value={discountCode}
                      onChange={handleDiscountCodeInput}
                      className="mt-1 flex-1"
                    />
                    <Button
                      disabled={!discountCode || isPendingApplyCoupon}
                      onClick={handleApplyDiscount}
                      className="mt-1"
                    >
                      {isPendingApplyCoupon ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="animate-spin" /> Loading...
                        </div>
                      ) : (
                        'Áp dụng'
                      )}
                    </Button>
                  </div>
                </div>

                {discountAmount > 0 && (
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
                disabled={
                  (hasDiscountCode && !isCouponApplied) ||
                  isPendingCreateVNPayPayment
                }
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
      <Dialog
        open={isCouponModalOpen}
        onOpenChange={() => setIsCouponModalOpen(false)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Chọn mã giảm giá</DialogTitle>
          </DialogHeader>
          {isLoading ? (
            <p>Đang tải mã giảm giá...</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {couponData?.data?.map((coupon: any) => {
                const isDisabled =
                  coupon.coupon.specific_course === 1 &&
                  !coupon.coupon.coupon_courses.some(
                    (courseItem: any) => courseItem.id === course.id
                  )

                const isSelected =
                  selectedCoupon &&
                  selectedCoupon.coupon.code === coupon.coupon.code

                return (
                  <div
                    key={coupon.id}
                    className={`cursor-pointer rounded-lg border p-4 ${
                      isDisabled
                        ? 'cursor-not-allowed opacity-50'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      if (!isDisabled) handleCouponSelection(coupon)
                    }}
                  >
                    <p className="font-bold">{coupon.coupon.code}</p>
                    <p>{coupon.coupon.name}</p>
                    <p>
                      {coupon.coupon.discount_type === 'percentage'
                        ? `${formatPercentage(coupon.coupon.discount_value)}`
                        : `- ${formatCurrency(coupon.coupon.discount_value)} `}
                    </p>
                    {isSelected && (
                      <p className="text-xs text-green-600">
                        Mã đang được áp dụng
                      </p>
                    )}
                    {isDisabled && (
                      <p className="text-sm text-red-500">
                        Mã này không áp dụng cho khoá học này
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BuyCourseModal
