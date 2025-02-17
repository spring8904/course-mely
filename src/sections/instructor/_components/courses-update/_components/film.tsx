import React from 'react'

const FilmEditing = () => {
  return (
    <>
      <div>
        <h3 className="text-xl font-bold">Biên tập</h3>
        <p className="mt-2 text-sm font-normal">
          Đây là khoảnh khắc của bạn! Nếu bạn đã xây dựng lộ trình và sử dụng
          hướng dẫn của chúng tôi, bạn đã chuẩn bị tốt cho buổi chụp thực tế.
          Hãy tự điều chỉnh, dành thời gian để làm cho nó vừa phải và tinh chỉnh
          khi bạn chỉnh sửa.
        </p>
      </div>
      <div className="mt-4 max-w-[800px]">
        <h3 className="text-xl font-bold">Mẹo</h3>
        <div className="mt-8">
          <h4 className="font-bold">Nghỉ giải lao và xem lại thường xuyên.</h4>
          <p className="mt-2 text-sm font-normal">
            Kiểm tra thường xuyên để xem có bất kỳ thay đổi nào như tiếng ồn mới
            không. Hãy lưu ý đến mức năng lượng của chính bạn - quay phim có thể
            khiến bạn mệt mỏi và điều đó sẽ được thể hiện trên màn hình.
          </p>
        </div>
        <div className="mt-8">
          <h4 className="font-bold">Xây dựng mối quan hệ.</h4>
          <p className="mt-2 text-sm font-normal">
            Học viên muốn biết ai đang dạy mình. Ngay cả đối với khóa học chủ
            yếu là screencast, hãy tự quay phim để giới thiệu. Hoặc đi xa hơn và
            tự quay phim giới thiệu từng phần!
          </p>
        </div>
        <div className="mt-8">
          <h4 className="font-bold">
            Để có thể xuất hiện trước ống kính cần phải luyện tập.
          </h4>
          <p className="mt-2 text-sm font-normal">
            Giao tiếp bằng mắt với máy ảnh và nói rõ ràng. Thực hiện nhiều lần
            quay lại cho đến khi bạn làm đúng.
          </p>
        </div>
        <div className="mt-8">
          <h4 className="font-bold">
            Chuẩn bị cho sự thành công trong việc biên tập.
          </h4>
          <p className="mt-2 text-sm font-normal">
            Bạn có thể chỉnh sửa các đoạn dừng dài, lỗi và ừm hoặc à. Quay một
            vài hoạt động hoặc hình ảnh bổ sung mà bạn có thể thêm vào sau để
            che các đoạn cắt đó.
          </p>
        </div>
        <div className="mt-8">
          <h4 className="font-bold">Tạo dấu âm thanh.</h4>
          <p className="mt-2 text-sm font-normal">
            Vỗ tay khi bạn bắt đầu mỗi lần quay để dễ dàng xác định điểm đột
            biến âm thanh trong quá trình chỉnh sửa. Sử dụng hướng dẫn của chúng
            tôi để quản lý ngày ghi âm của bạn một cách hiệu quả.
          </p>
        </div>{' '}
        <div className="mt-8">
          <h4 className="font-bold">Đối với bản ghi màn hình, hãy dọn dẹp.</h4>
          <p className="mt-2 text-sm font-normal">
            Di chuyển các tệp và thư mục không liên quan khỏi màn hình nền và mở
            bất kỳ tab nào trước. Làm cho văn bản trên màn hình có kích thước ít
            nhất 24pt và sử dụng chức năng thu phóng để tô sáng.
          </p>
        </div>
        <div className="mt-8">
          <p className="mt-2 text-sm font-normal">
            <h1 className="mb-6 text-2xl font-bold text-gray-800">Yêu cầu</h1>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                <span className="text-gray-700">
                  Âm thanh phải không có tiếng vang và tiếng ồn xung quanh để
                  không làm mất tập trung của học sinh
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                <span className="text-gray-700">
                  Quay phim và xuất ra ở chế độ HD để tạo video có độ phân giải
                  ít nhất là 720p hoặc 1080p nếu có thể
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                <span className="text-gray-700">
                  Âm thanh phải phát ra từ cả kênh trái và phải và được đồng bộ
                  hóa với video của bạn
                </span>
              </li>
            </ul>
          </p>
        </div>
      </div>
    </>
  )
}

export default FilmEditing
