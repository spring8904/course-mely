import { IFormControl } from '@/types'
import { UserRound, Mail, Lock } from 'lucide-react'

export const registerFormControls: IFormControl[] = [
  {
    name: 'name',
    label: 'Họ và tên',
    placeholder: 'Nhập họ và tên',
    componentType: 'input',
    type: 'text',
    icon: <UserRound size={18} />,
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Nhập email',
    componentType: 'input',
    type: 'email',
    icon: <Mail size={18} />,
  },
  {
    name: 'password',
    label: 'Mật khẩu',
    placeholder: 'Nhập mât khẩu',
    componentType: 'input',
    type: 'password',
    icon: <Lock size={18} />,
    isCheck: true,
  },
  {
    name: 'confirmPassword',
    label: 'Xác nhận mật khẩu',
    placeholder: 'Xác nhận mật khẩu',
    componentType: 'input',
    type: 'password',
    icon: <Lock size={18} />,
    isCheck: true,
  },
]
