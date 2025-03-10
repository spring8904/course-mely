'use client'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Nguyễn Minh Khang',
    image: 'https://picsum.photos/300/300?random=1',
    text: 'CourseMely thực sự giúp tôi học tập hiệu quả hơn. Các bài giảng rất chi tiết, dễ hiểu và có tính ứng dụng cao. Tôi cảm thấy tự tin hơn khi áp dụng kiến thức vào thực tế.',
  },
  {
    id: 2,
    name: 'Trần Gia Hân',
    image: 'https://picsum.photos/300/300?random=2',
    text: 'Nội dung khóa học chất lượng, dễ tiếp thu và được cập nhật thường xuyên. Tôi đánh giá cao sự hỗ trợ từ giảng viên và cộng đồng học viên rất thân thiện, nhiệt tình.',
  },
  {
    id: 3,
    name: 'Lê Hoàng Anh',
    image: 'https://picsum.photos/300/300?random=3',
    text: 'Giảng viên nhiệt tình, hỗ trợ rất tốt. Tôi đã cải thiện đáng kể kỹ năng của mình sau khi tham gia khóa học. Đây là nền tảng học tập tuyệt vời mà tôi muốn giới thiệu cho bạn bè.',
  },
  {
    id: 4,
    name: 'Phạm Thanh Tú',
    image: 'https://picsum.photos/300/300?random=4',
    text: 'Giao diện đẹp, trải nghiệm học tập tốt. Các bài học được trình bày khoa học, có hướng dẫn chi tiết. Tôi cảm thấy rất hài lòng và chắc chắn sẽ tiếp tục học trên nền tảng này.',
  },
  {
    id: 5,
    name: 'Võ Bảo Long',
    image: 'https://picsum.photos/300/300?random=5',
    text: 'Các khóa học được thiết kế bài bản, lộ trình rõ ràng. Tôi đã học hỏi được rất nhiều điều bổ ích và có thể áp dụng ngay vào công việc của mình.',
  },
  {
    id: 6,
    name: 'Đặng Ngọc Lan',
    image: 'https://picsum.photos/300/300?random=6',
    text: 'Tôi rất ấn tượng với chất lượng giảng dạy và tài liệu của CourseMely. Khóa học không chỉ giúp tôi nắm vững lý thuyết mà còn có nhiều bài tập thực hành để áp dụng ngay.',
  },
]

export const StudentTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(false)

  const changeSlide = (newIndex: number) => {
    setFade(true)
    setTimeout(() => {
      setCurrentIndex(newIndex)
      setFade(false)
    }, 300)
  }

  const nextSlide = () => {
    changeSlide((currentIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    changeSlide((currentIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="mx-auto max-w-7xl">
      <h2 className="mb-4 text-3xl font-semibold text-gray-800">
        Học viên nói gì về CourseMely
      </h2>
      <section className="relative flex items-center justify-center rounded-lg p-12">
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-gray-700 p-2 text-white shadow-md hover:bg-gray-800"
        >
          <ChevronsLeft size={40} />
        </button>
        <div
          className={`grid min-h-[300px] max-w-4xl grid-cols-1 items-center gap-4 rounded-xl bg-gray-50 transition-opacity duration-500 md:grid-cols-2 ${fade ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="flex flex-col justify-center p-4 text-center md:text-left">
            <p className="text-2xl font-semibold text-gray-800">
              &quot;{testimonials[currentIndex].text}&quot;
            </p>
            <h3 className="mt-4 text-lg font-bold text-gray-700">
              {testimonials[currentIndex].name}
            </h3>
          </div>
          <div className="flex justify-center">
            <Image
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].name}
              width={200}
              height={200}
              className="size-40 rounded-full object-cover"
            />
          </div>
        </div>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-gray-700 p-2 text-white shadow-md hover:bg-gray-800"
        >
          <ChevronsRight size={40} />
        </button>
      </section>
    </section>
  )
}
