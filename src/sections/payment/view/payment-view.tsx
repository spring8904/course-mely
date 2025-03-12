import React from 'react'

import PaymentErrorView from '@/sections/payment/_components/payment-error'
import PaymentFailureView from '@/sections/payment/_components/payment-failure'
import PaymentSuccessView from '@/sections/payment/_components/payment-success'
import PaymentUnknownView from '@/sections/payment/_components/payment-unknown'

const PaymentView = ({
  status,
  error,
}: {
  status: string
  error: string | null
}) => {
  if (status === 'success') {
    return <PaymentSuccessView />
  }

  if (status === 'failure') {
    return <PaymentFailureView error={error} />
  }

  if (status === 'error') {
    return <PaymentErrorView error={error} />
  }

  return (
    <>
      <PaymentUnknownView />
    </>
  )
}

export default PaymentView
