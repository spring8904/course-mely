import React from 'react'

import { IUser } from '@/types'

import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import InputSeach from '@/components/common/InputSeach'

// import UserMenu from '../common/UserMenu'

const TopBar = ({ userData }: { userData: IUser }) => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h3 className="font-medium">Xin chào, {userData.name}</h3>
      </div>
      <div className="flex items-center space-x-4 px-6">
        <InputSeach />
        {/* <UserMenu userData={userData} /> */}
      </div>
    </header>
  )
}

export default TopBar
