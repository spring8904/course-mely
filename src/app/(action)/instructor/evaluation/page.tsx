import EvaluationView from '@/sections/instructor/view/evaluation-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Danh sách đánh giá',
}

const Page = () => {
  return <EvaluationView />
}

export default Page
