import Image from 'next/image'

const data = [
  {
    image: '/images/su-menh.webp',
    title: 'Sứ mệnh',
    content: 'Giúp mọi người tiếp cận tri thức dễ dàng, tiện lợi và hiệu quả.',
  },
  {
    image: '/images/tam-nhin.webp',
    title: 'Tầm nhìn',
    content:
      'Trở thành nền tảng quản lý khóa học hàng đầu, hỗ trợ hàng triệu học viên.',
  },
]

export const MissionVison = () => {
  return (
    <section>
      <h2 className="mb-4 text-3xl font-semibold text-gray-800">
        Sứ mệnh & Tầm nhìn
      </h2>
      <div className="grid items-center gap-8 md:grid-cols-2">
        {data.map((item, index) => (
          <div className="rounded-lg bg-gray-100 p-6 text-center" key={index}>
            <Image
              src={item.image}
              alt={item.title}
              width={500}
              height={300}
              className="mb-4 h-48 w-full rounded-lg object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-700">
              {item.title}
            </h3>
            <p className="mt-2 text-gray-600">{item.content}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
