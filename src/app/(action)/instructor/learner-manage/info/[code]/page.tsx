import React from 'react'
import LearnerInformationView from '@/sections/instructor/view/learner-information-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thông tin học viên',
}
interface Props {
  params: {
    code: string
  }
}

const Page = ({ params }: Props) => {
  const { code } = params
  return <LearnerInformationView code={code} />
}

export default Page
