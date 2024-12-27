import Link from 'next/link';
import { MoveLeft } from 'lucide-react'

const PageNotFound = () => {
  return (
    <div className={`flex h-screen flex-col items-center justify-center bg-[#F8FAFC] leading-8 font-manrope`}>
      <h1 className="text-7xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-5xl font-bold">Không tìm thấy nội dung</h2>
      <p className="mt-4">URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.</p>
      <p className="mt-4">Nếu bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì dùng URL đã lưu.</p>
      <Link
        className="mt-4 flex items-center gap-2 hover:text-primary"
        href="/"
      >
        <MoveLeft />
        Trang chủ
      </Link>
    </div>
  );
};

export default PageNotFound;
