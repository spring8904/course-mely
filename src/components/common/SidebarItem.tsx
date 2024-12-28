import { ISidebarData } from '@/types'

const SidebarItem = ({ sidebarData }: { sidebarData: ISidebarData }) => (
  <div className="flex cursor-pointer items-center space-x-4 rounded-lg p-4 hover:bg-[#F69983] hover:text-white">
    <div>{sidebarData?.icon}</div>
    <p className="font-medium">{sidebarData.name}</p>
  </div>
)

export default SidebarItem
