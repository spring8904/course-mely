import Image from 'next/image'

import { ISidebarData } from '@/types'

import SidebarItem from '../common/SidebarItem'

const LeftSidebar = ({
  leftSidebarData,
}: {
  leftSidebarData: ISidebarData[]
}) => (
  <div className="px-5 pt-4">
    <div className="mx-auto flex w-fit items-center space-x-3">
      <Image
        src="/images/Logo.png"
        alt="CourseHUB logo"
        width={40}
        height={40}
      />
      <h2 className="text-xl font-extrabold">CourseHUB</h2>
    </div>

    <div className="mt-12 space-y-4">
      {leftSidebarData.map((sidebarItem: ISidebarData) => (
        <SidebarItem sidebarData={sidebarItem} key={sidebarItem.name} />
      ))}
    </div>
  </div>
)

export default LeftSidebar
