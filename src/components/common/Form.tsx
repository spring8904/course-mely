import { IFormControl } from '@/types'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import CommonInput from './Input'

type CommonFormProps = {
  formControls: IFormControl[]
  isLogin?: boolean
  btnText: string
}

const CommonForm = ({ formControls, isLogin, btnText }: CommonFormProps) => {
  return (
    <form className="w-full flex-col space-y-5">
      {formControls.map((controlItem) => (
        <div key={controlItem.name} className="w-full">
          <p className="mb-2 font-medium text-[#0A033C]">{controlItem.label}</p>
          <CommonInput inputProps={controlItem} />
        </div>
      ))}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {!isLogin && (
            <>
              <Checkbox className="size-5" />
              <span>Ghi nhớ đăng nhập</span>
            </>
          )}
        </div>
        <div>
          <Link href="#!" className="font-semibold hover:underline">
            Quên mật khẩu?
          </Link>
        </div>
      </div>

      <Button className="w-full py-6 text-lg font-medium">
        {btnText || 'Submit'}
      </Button>

      <div className="text-center">
        {isLogin ? (
          <p className="text-[#5D5A6F]">
            Bạn chưa có tài khoản?{' '}
            <Link href="/signup" className="text-primary hover:underline">
              Đăng ký
            </Link>
          </p>
        ) : (
          <p className="text-[#5D5A6F]">
            Bạn đã có tài khoản?{' '}
            <Link href="/signin" className="text-primary hover:underline">
              Đăng nhập
            </Link>
          </p>
        )}
      </div>
    </form>
  )
}

export default CommonForm
