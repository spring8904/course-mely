import WithDrawRequestView from '@/sections/instructor/view/with-draw-request-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Danh sách yêu cầu rút tiền',
}

const Page = () => {
  return <WithDrawRequestView />
}

export default Page
