import { CircleHelp, CirclePlay, FileCode2, ScrollText } from 'lucide-react'

import { IFormControl } from '@/types'

export const signupFormFieldList: IFormControl[] = [
  {
    id: 'name',
    type: 'text',
    name: 'name',
    label: 'Họ và tên',
    rules: {
      required: 'Tên là bắt buộc.',
      validate: (value) => {
        if (!value?.trim()) {
          return 'Tên không được chỉ chứa khoảng trắng.'
        }
        if (!/^[\p{L}\s]+$/u.test(value)) {
          return 'Tên chỉ được phép chứa chữ cái và khoảng trắng.'
        }
        return true
      },
      minLength: { value: 2, message: 'Tên phải có ít nhất 2 ký tự' },
      maxLength: { value: 255, message: 'Tên không được vượt quá 255 ký tự' },
    },
  },
  {
    id: 'email',
    type: 'email',
    name: 'email',
    label: 'Email',
    rules: {
      required: 'Email là bắt buộc.',
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: 'Định dạng email không hợp lệ.',
      },
      maxLength: {
        value: 255,
        message: 'Email không được vượt quá 255 ký tự.',
      },
    },
  },
  {
    id: 'password',
    type: 'password',
    name: 'password',
    label: 'Mật khẩu',
    rules: {
      required: 'Mật khẩu là bắt buộc.',
      minLength: { value: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự.' },
      maxLength: {
        value: 255,
        message: 'Mật khẩu không được vượt quá 255 ký tự.',
      },
      pattern: {
        value: /^(?=.*[A-Z]).+$/,
        message: 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa.',
      },
    },
  },
  {
    id: 'repassword',
    type: 'password',
    name: 'repassword',
    label: 'Xác nhận mật khẩu',
    rules: {
      required: 'Vui lòng xác nhận mật khẩu.',
      minLength: {
        value: 8,
        message: 'Xác nhận mật khẩu phải có ít nhất 8 ký tự.',
      },
      validate: {
        same: (value, formValues) =>
          value === formValues?.password ||
          'Mật khẩu và xác nhận mật khẩu không khớp.',
      },
    },
  },
]

export const signinFormFieldList: IFormControl[] = [
  {
    id: 'email',
    type: 'email',
    name: 'email',
    label: 'Email',
    rules: {
      required: 'Vui lòng nhập email',
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: 'Email không hợp lệ',
      },
    },
  },
  {
    id: 'password',
    type: 'password',
    name: 'password',
    label: 'Mật khẩu',
    rules: {
      required: 'Vui lòng nhập mật khẩu',
      minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
    },
  },
]

export const lessonTypeIcons = {
  video: <CirclePlay size={16} />,
  document: <ScrollText size={16} />,
  quiz: <CircleHelp size={16} />,
  coding: <FileCode2 size={16} />,
}
