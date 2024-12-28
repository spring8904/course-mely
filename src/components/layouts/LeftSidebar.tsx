import { leftSidebarData } from '@/configs'
import { ILeftSidebarData } from '@/types'
import Image from 'next/image'

const LeftSidebarItem = ({
  leftSidebarData,
}: {
  leftSidebarData: ILeftSidebarData
}) => (
  <div className="flex cursor-pointer items-center space-x-4 rounded-lg p-4 hover:bg-[#F69983] hover:text-white">
    <div>{leftSidebarData?.icon}</div>
    <p className="font-medium">{leftSidebarData.name}</p>
  </div>
)

const LeftSidebar = () => (
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
      {leftSidebarData.map((sidebarItem: ILeftSidebarData) => (
        <LeftSidebarItem leftSidebarData={sidebarItem} key={sidebarItem.name} />
      ))}
    </div>
  </div>
)

export default LeftSidebar
