import SidebarItem from '@/components/common/SidebarItem'
import { ISidebarData } from '@/types'

const Sidebar = ({ options }: { options: ISidebarData[] }) => (
  <div className="h-fit rounded-lg bg-white px-7 py-8 shadow-md">
    <p className="font-bold">Cập nhật và quản lý tài khoản</p>

    <div className="mt-6 space-y-4">
      {options.map((sidebarItem) => (
        <SidebarItem sidebarData={sidebarItem} key={sidebarItem.name} />
      ))}
    </div>
  </div>
)

export default Sidebar
