import Link from 'next/link'

export const CourseIntro = () => (
  <div className="content w-3/4 py-6">
    <ul className="breadcrumbs mb-6 flex items-center justify-start gap-2">
      <li>
        <Link href="/">
          <i className="icon-home" />
        </Link>
      </li>
      <li>
        <i className="icon-arrow-right" />
      </li>
      <li>Trang chủ</li>
      <li>
        <i className="icon-arrow-right" />
      </li>
      <li>Danh sách khoá học</li>
    </ul>
    <h2 className="fw-7">Khám Phá Tất Cả Khoá Học Của Chúng Tôi</h2>
    <div className="mt-6">
      <p>
        Chào mừng bạn đến với danh sách khóa học trực tuyến! Tại đây, bạn có thể
        tìm thấy hàng trăm khóa học thuộc nhiều lĩnh vực khác nhau, từ lập
        trình, thiết kế, kinh doanh đến phát triển cá nhân.
      </p>
      <p>
        Dù bạn là người mới bắt đầu hay đã có kinh nghiệm, chúng tôi luôn có
        những khóa học phù hợp để giúp bạn nâng cao kỹ năng, mở rộng cơ hội và
        phát triển sự nghiệp. Hãy chọn lĩnh vực bạn quan tâm và bắt đầu hành
        trình học tập ngay hôm nay!
      </p>
    </div>
  </div>
)
