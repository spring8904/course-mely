import LearnerManageView from '@/sections/instructor/view/learner-manage-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quản lý học viên',
}

const Page = () => {
  return <LearnerManageView />
}

export default Page
