import SettingsView from '@/sections/instructor/view/settings-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thông tin tài khoản',
}

const page = ({ params }: { params: { tab: string } }) => {
  return <SettingsView tab={params.tab} />
}

export default page
