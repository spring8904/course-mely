import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { userInfoFormControls } from '@/configs'
import { ShieldCheck, UserRoundCog } from 'lucide-react'

const AccountView = () => {
  return (
    <div className="px-5 py-2">
      <div className="mt-6">
        <h1 className="text-xl font-bold">Quản lý tài khoản</h1>
        <div className="mt-6">
          <Tabs defaultValue="userinfo" className="grid grid-cols-12 gap-8">
            <div className="col-span-3 h-[300px] rounded-lg bg-white p-6 shadow-custom">
              <p className="font-bold">Cập nhật và quản lý tài khoản</p>
              <TabsList className="mt-6 flex flex-col items-center justify-start gap-2">
                <TabsTrigger
                  value="userinfo"
                  className="w-full py-3 text-black hover:bg-[#FF6652] data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <div className="flex gap-2">
                    <UserRoundCog size={18} />
                    <span className="font-medium">Thông tin cá nhân</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="sidebar"
                  className="w-full py-3 text-black hover:bg-[#FF6652] data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <div className="flex gap-2">
                    <ShieldCheck size={18} />
                    <span className="font-medium">Mật khẩu và bảo mật</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* <div className="col-span-9">
              <TabsContent value="userinfo" className="m-0">
                <UserInfoForm controls={userInfoFormControls} />
              </TabsContent>
              <TabsContent value="sidebar" className="m-0">
                <UserMyPassword controls={userInfoFormControls} />
              </TabsContent>
            </div> */}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default AccountView
