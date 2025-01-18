import { IFormControl, ISidebarData } from '@/types'
import {
  BookText,
  Compass,
  GraduationCap,
  History,
  PencilLine,
  ShieldCheck,
  UserRoundCog,
  Wallet,
} from 'lucide-react'

export const signupFormFieldList: IFormControl[] = [
  {
    id: 'name',
    type: 'text',
    name: 'name',
    label: 'Họ và tên',
  },
  {
    id: 'email',
    type: 'email',
    name: 'email',
    label: 'Email',
  },
  {
    id: 'password',
    type: 'password',
    name: 'password',
    label: 'Mật khẩu',
  },
  {
    id: 'rePassword',
    type: 'password',
    name: 'rePassword',
    label: 'Xác nhận mật khẩu',
  },
]

export const signinFormFieldList: IFormControl[] = [
  {
    id: 'email',
    type: 'email',
    name: 'email',
    label: 'Email',
  },
  {
    id: 'password',
    type: 'password',
    name: 'password',
    label: 'Mật khẩu',
  },
]

export const leftSidebarStudentData: ISidebarData[] = [
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

export const sidebarUserOptions: ISidebarData[] = [
  {
    name: 'Thông tin cá nhân',
    icon: <UserRoundCog size={18} />,
  },
  {
    name: 'Mật khẩu và bảo mật',
    icon: <ShieldCheck size={18} />,
  },
]
