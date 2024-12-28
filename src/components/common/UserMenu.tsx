import { IUser } from '@/types'
import { Bell } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

const UserMenu = ({ userData }: { userData: IUser }) => {
  const lastWordInitial =
    userData?.name
      ?.trim()
      .split(' ')
      .slice(-1)
      .toString()
      .charAt(0)
      .toUpperCase() ?? 'A'

  return (
    <div className="flex items-center space-x-5">
      <div>
        <Link
          href="/my-courses"
          className="font-medium text-[#101828] hover:opacity-80"
        >
          Khoá học của tôi
        </Link>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>
              <Bell size={20} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Notifications</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div>
        <Avatar className="cursor-pointer overflow-hidden rounded-full border-2 border-[#FC6441]">
          <AvatarImage src={userData?.avatar ?? ''} alt="avatar" />
          <AvatarFallback>{lastWordInitial}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default UserMenu
