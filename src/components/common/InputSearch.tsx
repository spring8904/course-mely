import React from 'react'
import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

const InputSearch = ({ className }: { className?: string }) => {
  return (
    <div className="relative">
      <Input
        placeholder="Tìm kiếm khoá học, bài viết,..."
        className={`w-[300px] pl-10 ${className}`}
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        <Search />
      </span>
    </div>
  )
}

export default InputSearch
