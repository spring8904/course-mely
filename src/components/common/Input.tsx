import { IFormControl } from '@/types'
import { Eye } from 'lucide-react'

const CommonInput = ({ inputProps }: { inputProps: IFormControl }) => (
  <div className="flex items-center justify-between rounded-lg border px-5 py-4">
    <div className="flex flex-1 items-center space-x-4">
      <div className="text-[#5D5A6F]">{inputProps.icon}</div>
      <div className="flex-1">
        <input
          type={inputProps.type}
          name={inputProps.name}
          placeholder={inputProps.placeholder}
          className="w-full outline-none"
        />
      </div>
    </div>
    <div className="text-[#5D5A6F]">
      {inputProps.isCheck && <Eye size={18} className="cursor-pointer" />}
    </div>
  </div>
)

export default CommonInput
