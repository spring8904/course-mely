'use client'

import { useAuthStore } from '@/stores/useAuthStore'

import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import InputSearch from '@/components/common/InputSearch'

const TopBar = () => {
  const { user } = useAuthStore()

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h3 className="font-medium">Xin chào, {user?.name || 'Người dùng'}</h3>
      </div>
      <div className="flex items-center space-x-4 px-6">
        <InputSearch />
        {/* <UserMenu userData={userData} /> */}
      </div>
    </header>
  )
}

export default TopBar
