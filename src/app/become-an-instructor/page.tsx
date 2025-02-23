import { Metadata } from 'next'

import BecomeAnInstructor from '@/sections/become-an-instructor/views/become-an-instructor'

export const metadata: Metadata = {
  title: 'Trở thành giảng viên',
}

const page = () => {
  return <BecomeAnInstructor />
}

export default page
