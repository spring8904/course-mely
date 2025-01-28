import { IFormControl } from '@/types'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const UserMyPassword = ({ controls }: { controls: IFormControl[] }) => (
  <Card className="">
    <CardHeader>
      <CardTitle>
        <h3 className="font-bold">Thông tin cá nhân</h3>
        <p className="mt-4 text-sm font-normal">Thay đổi mật khẩu</p>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <form className="w-full flex-col space-y-4">
        {controls.map((controlItem) => (
          <div key={controlItem.name} className="w-full">
            <p className="mb-2 font-medium text-[#0A033C]">
              {controlItem.label}
            </p>
            <Input
              name={controlItem.name}
              placeholder={controlItem.placeholder}
              className="w-full outline-none"
            />
          </div>
        ))}
        <Button>Cập nhật</Button>
      </form>
      <form></form>
    </CardContent>
  </Card>
)

export default UserMyPassword
