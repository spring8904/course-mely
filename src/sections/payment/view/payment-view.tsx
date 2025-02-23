import React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

const PaymentView = ({
  status,
  error,
}: {
  status: string
  error: string | null
}) => {
  if (status === 'success') {
    return (
      <div className="payment-status success">
        <h1>Thanh toán thành công!</h1>
        <p>Cảm ơn bạn! Giao dịch đã hoàn tất.</p>
        <Link href="/my-courses">
          <Button>Khoá học của tôi</Button>
        </Link>
      </div>
    )
  }

  if (status === 'failure') {
    return (
      <div className="payment-status failure">
        <h1>Thanh toán thất bại!</h1>
        <p>Giao dịch không thành công. Vui lòng thử lại.</p>
        {error && (
          <p>
            Mã lỗi: <b>{error}</b>
          </p>
        )}
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="payment-status error">
        <h1>Đã xảy ra lỗi!</h1>
        <p>Xin lỗi, đã có lỗi xảy ra trong lúc xử lý giao dịch của bạn.</p>
        {error && (
          <p>
            Chi tiết lỗi: <b>{error}</b>
          </p>
        )}
      </div>
    )
  }

  return (
    <>
      <div>
        <h1>Trạng thái không xác định</h1>
        <p>Vui lòng kiểm tra lại hoặc liên hệ với hỗ trợ.</p>
      </div>
    </>
  )
}

export default PaymentView
