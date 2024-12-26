import Image from 'next/image'
import Link from 'next/link'

type ContactInfo = {
  phone: string
  email: string
  address: string
}

const FooterColumn = ({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string }[]
}) => (
  <div>
    <h2 className="mb-4 text-xl font-bold">{title}</h2>
    <ul className="space-y-4">
      {links.map((link) => (
        <li key={`${link.label}-${link.href}`}>
          <Link href={link.href} className="hover:underline">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

const Footer = () => {
  const contactInfo: ContactInfo = {
    phone: '0868313293',
    email: 'coursehub.support@gmail.com',
    address: 'Trịnh Văn Bô, Nam Từ Liêm, TP. Hà Nội',
  }

  return (
    <footer>
      <div className="grid grid-cols-1 gap-10 bg-[url('/images/footer-bg.png')] bg-cover bg-center px-32 py-14 text-white lg:grid-cols-4">
        <div>
          <div className="flex items-center space-x-3">
            <Image
              src="/images/Logo.png"
              alt="CourseHUB logo"
              width={54}
              height={54}
            />
            <h2 className="text-xl font-bold">
              CourseHUB - Nền tảng học trực tuyến
            </h2>
          </div>

          <ul className="mt-6 space-y-4">
            <li>Điện thoại: {contactInfo.phone}</li>
            <li>Email: {contactInfo.email}</li>
            <li>Địa chỉ: {contactInfo.address}</li>
          </ul>
        </div>

        <FooterColumn
          title="Về chúng tôi"
          links={[
            { label: 'Giới thiệu', href: '#!' },
            { label: 'Liên hệ', href: '#!' },
            { label: 'Blog', href: '#!' },
            { label: 'Điều khoản', href: '#!' },
          ]}
        />

        <FooterColumn
          title="Chính sách và điều khoản"
          links={[
            { label: 'Chính sách bảo mật', href: '#!' },
            { label: 'Điều khoản dịch vụ', href: '#!' },
            { label: 'Chính sách hoàn tiền', href: '#!' },
            { label: 'Chính sách xử lý khiếu lại', href: '#!' },
          ]}
        />

        <FooterColumn
          title="Hỗ trợ khách hàng"
          links={[
            { label: 'Câu hỏi thường gặp', href: '#!' },
            { label: 'Hướng dẫn sử dụng', href: '#!' },
            { label: 'Gửi yêu cầu hỗ trợ', href: '#!' },
            { label: 'Liên hệ bộ phận CSKH', href: '#!' },
          ]}
        />
      </div>

      <div className="bg-[#222222] py-3 text-center">
        <p className="text-sm font-bold text-white">
          © 2025 CourseHUB. Nền tảng học trực tuyến hàng đầu Việt Nam
        </p>
      </div>
    </footer>
  )
}

export default Footer
