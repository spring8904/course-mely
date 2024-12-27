'use client'

import { IFormControl } from '@/types'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

const CommonInput = ({ inputProps }: { inputProps: IFormControl }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex items-center justify-between rounded-lg border px-5 py-4">
      <div className="flex flex-1 items-center space-x-4">
        <div className="text-[#5D5A6F]">{inputProps.icon}</div>
        <div className="flex-1">
          <input
            type={showPassword ? 'text' : inputProps.type}
            name={inputProps.name}
            placeholder={inputProps.placeholder}
            className="w-full outline-none"
          />
        </div>
      </div>
      <div className="text-[#5D5A6F]">
        {inputProps.type === 'password' && (
          <button
            onClick={togglePasswordVisibility}
            className="cursor-pointer"
            type="button"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  )
}

export default CommonInput
