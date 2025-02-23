'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import PaymentView from '@/sections/payment/view/payment-view'

const PaymentPage = () => {
  const searchParams = useSearchParams()

  const status = searchParams.get('status') || 'unknown'
  const error = searchParams.get('error') || null

  return <PaymentView status={status} error={error} />
}

export default PaymentPage
