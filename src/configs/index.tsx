import { IFormControl, ILeftSidebarData } from '@/types'
import {
  BookText,
  Compass,
  GraduationCap,
  History,
  Lock,
  Mail,
  PencilLine,
  UserRound,
  Wallet,
} from 'lucide-react'

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
  },
  {
    name: 'confirmPassword',
    label: 'Xác nhận mật khẩu',
    placeholder: 'Xác nhận mật khẩu',
    componentType: 'input',
    type: 'password',
    icon: <Lock size={18} />,
  },
]

export const loginFormControls: IFormControl[] = [
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
  },
]

export const leftSidebarData: ILeftSidebarData[] = [
  {
    name: 'Khám phá',
    icon: <Compass size={18} />,
  },
  {
    name: 'Khu vực học tập',
    icon: <BookText size={18} />,
  },
  {
    name: 'Người hướng dẫn',
    icon: <GraduationCap size={18} />,
  },
  {
    name: 'Bài viết',
    icon: <PencilLine size={18} />,
  },
  {
    name: 'Ví của bạn',
    icon: <Wallet size={18} />,
  },
  {
    name: 'Giao dịch gần đây',
    icon: <History size={18} />,
  },
]
