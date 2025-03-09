import { WalletView } from '@/sections/wallet/view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ví của bạn',
}

const page = () => {
  return <WalletView />
}

export default page
