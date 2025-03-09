import LiveStreamManageView from '@/sections/instructor/view/live-stream-manage-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quản lý phát trực tiếp',
}

const Page = () => {
  return <LiveStreamManageView />
}

export default Page
