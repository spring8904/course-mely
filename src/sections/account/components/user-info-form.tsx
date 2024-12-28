import CommonInput from '@/components/common/Input'
import { Button } from '@/components/ui/button'
import { IFormControl } from '@/types'

const UserInfoForm = ({ controls }: { controls: IFormControl[] }) => (
  <div className="flex-1 rounded-lg bg-white px-7 py-8">
    <h3 className="font-bold">Thông tin cá nhân</h3>
    <p className="mt-4 text-sm font-normal">Quản lý thông tin của bạn</p>

    <form className="mt-4 w-full flex-col space-y-4">
      {controls.map((controlItem) => (
        <div key={controlItem.name} className="w-full">
          <p className="mb-2 font-medium text-[#0A033C]">{controlItem.label}</p>
          <CommonInput inputProps={controlItem} />
        </div>
      ))}

      <Button>Cập nhật</Button>
    </form>
  </div>
)

export default UserInfoForm
