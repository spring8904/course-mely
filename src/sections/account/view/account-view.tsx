import { sidebarUserOptions, userInfoFormControls } from '@/configs'
import Sidebar from '../components/sidebar'
import UserInfoForm from '../components/user-info-form'

const AccountView = () => {
  return (
    <div>
      <h1 className="text-xl font-bold">Quản lý tài khoản</h1>

      <div className="mt-11 flex flex-wrap gap-5">
        <Sidebar options={sidebarUserOptions} />
        <UserInfoForm controls={userInfoFormControls} />
      </div>
    </div>
  )
}

export default AccountView
