import TransactionManageView from '@/sections/instructor/view/transaction-manage-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quản lý giao dịch',
}

const TransactionPage = () => {
  return <TransactionManageView />
}

export default TransactionPage
