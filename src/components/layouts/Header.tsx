import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-10 flex items-center justify-between bg-white px-32 py-6 shadow-sm">
      <div className="flex items-center gap-3">
        <Link href="#">
          <Image src="/images/Logo.png" alt="logo" width={54} height={54} />
        </Link>
        <h2 className="text-3xl font-extrabold">CourseHUB</h2>
      </div>

      <div className="w-96 rounded-[8px] border px-4 py-3">
        <form className="flex items-center gap-2">
          <Search color="#98A2B3" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm khoá học, bài viết,..."
            className="flex-1 outline-none"
          />
        </form>
      </div>

      <div>
        <ul className="flex items-center gap-6">
          <li>
            <Link href="#" className="font-medium hover:underline">
              Trang chủ
            </Link>
          </li>
          <li>
            <Link href="#" className="font-medium hover:underline">
              Khoá học
            </Link>
          </li>
          <li>
            <Link href="#" className="font-medium hover:underline">
              Bài viết
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" className="text-base font-semibold">
          Đăng ký
        </Button>
        <Button className="text-base font-semibold">Đăng nhập</Button>
      </div>
    </header>
  )
}

export default Header
