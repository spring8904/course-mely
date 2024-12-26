import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

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

const ActionButtons = () => (
  <div className="flex items-center space-x-2">
    <Button variant="secondary" className="text-base font-semibold">
      Đăng ký
    </Button>
    <Button className="text-base font-semibold">Đăng nhập</Button>
  </div>
)

const Header = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-10 flex items-center justify-between bg-white px-32 py-6 shadow-sm">
      <Logo />
      <SearchBar />
      <NavLinks />
      <ActionButtons />
    </header>
  )
}

export default Header
