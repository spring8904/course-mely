import { IUser } from '@/types'
import SearchBarHeader from '../common/SearchBarHeader'
import UserMenu from '../common/UserMenu'

const TopSidebar = ({ userData }: { userData: IUser }) => {
  return (
    <div className="flex items-center justify-between bg-white px-5 py-4">
      <div>
        <p className="font-medium">Xin chào, {userData?.name}</p>
      </div>

      <div className="flex items-center space-x-4">
        <SearchBarHeader />
        <UserMenu userData={userData} />
      </div>
    </div>
  )
}

export default TopSidebar
