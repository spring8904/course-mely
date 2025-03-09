import { MissionVison } from '@/sections/about-us/_components/mission-vision'
import { FoundingTeam } from '@/sections/about-us/_components/founding-team'

const members = [
  {
    name: 'Trương Văn Tùng',
    image: 'https://picsum.photos/300/300?random=1',
    role: 'Lập trình viên',
  },
  {
    name: 'Nguyễn Thành Long',
    image: 'https://picsum.photos/300/300?random=2',
    role: 'Lập trình viên',
  },
  {
    name: 'Lê Đức Anh',
    image: 'https://picsum.photos/300/300?random=3',
    role: 'Lập trình viên',
  },
  {
    name: 'Đặng Việt Hoàng',
    image: 'https://picsum.photos/300/300?random=4',
    role: 'Lập trình viên',
  },
  {
    name: 'Trần Thế Nguyên',
    image: 'https://picsum.photos/300/300?random=5',
    role: 'Lập trình viên',
  },
  {
    name: 'Nguyễn Xuân Lâm',
    image: 'https://picsum.photos/300/300?random=6',
    role: 'Lập trình viên',
  },
  {
    name: 'Phạm Văn Hợp',
    image: 'https://picsum.photos/300/300?random=7',
    role: 'Lập trình viên',
  },
]

export const AboutUsView = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Về CourseMely</h1>
        <p className="mt-4 text-lg text-gray-600">
          Kết nối tri thức, nâng tầm tương lai.
        </p>
      </section>

      {/* Sứ mệnh & Tầm nhìn */}
      <MissionVison />

      {/* Đội ngũ sáng lập */}
      <FoundingTeam members={members} />

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Tham gia CourseMely ngay hôm nay!
        </h2>
        <button className="mt-4 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700">
          Đăng ký ngay
        </button>
      </section>
    </div>
  )
}
