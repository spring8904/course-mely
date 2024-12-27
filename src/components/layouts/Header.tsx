'use client'

import { IUser, UserStatus } from '@/types'
import { Bell, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

const Logo = () => (
  <Link href="/" className="flex items-center space-x-3">
    <Image src="/images/Logo.png" alt="logo" width={54} height={54} />
    <h2 className="text-3xl font-extrabold">CourseHUB</h2>
  </Link>
)

const SearchBar = () => (
  <div className="w-96 rounded-lg border px-4 py-3">
    <form className="flex items-center space-x-2">
      <Search color="#98A2B3" size={20} />
      <input
        type="text"
        placeholder="Tìm kiếm khoá học, bài viết,..."
        className="flex-1 outline-none"
      />
    </form>
  </div>
)

const NavLinks = () => {
  const links = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Khoá học', href: '/courses' },
    { label: 'Bài viết', href: '/posts' },
  ]

  return (
    <ul className="flex items-center space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="font-medium hover:underline">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const AuthButtons = () => {
  const router = useRouter()

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="secondary"
        className="text-base font-semibold"
        onClick={() => router.push('/sign-up')}
      >
        Đăng ký
      </Button>
      <Button
        className="text-base font-semibold"
        onClick={() => router.push('/sign-in')}
      >
        Đăng nhập
      </Button>
    </div>
  )
}

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

const Header = () => {
  const user: IUser | null = {
    id: 1,
    code: 'USR001',
    name: 'John Doe',
    email: 'johndoe@example.com',
    emailVerifiedAt: new Date('2024-12-25T12:00:00Z'),
    password: 'securepassword123',
    avatar: 'https://example.com/avatar.jpg',
    verificationToken: 'abc123xyz',
    rememberToken: 'token56789',
    status: UserStatus.Active,
    deletedAt: null,
    createdAt: new Date('2024-01-01T09:00:00Z'),
    updatedAt: new Date('2024-12-27T15:30:00Z'),
  }

  return (
    <header className="sticky inset-x-0 top-0 z-10 flex items-center justify-between bg-white px-32 py-6 shadow-sm">
      <Logo />
      <SearchBar />
      <NavLinks />
      {user ? <UserMenu userData={user} /> : <AuthButtons />}
    </header>
  )
}

export default Header
