'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import ModalOption from '@/sections/become-an-instructor/_components/modal-option'

const BecomeAnInstructor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setIsModalOpen(true)
  }, [])

  return (
    <>
      <ModalOption isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <div className="grid grid-cols-12">
        <div className="col-span-9 p-10">
          <div>
            <Link href="/">
              <Image
                src="/images/logo/logo.svg"
                width={200}
                height={200}
                alt=""
              />
            </Link>
            <div className="mt-4">
              <h2 className="text-2xl font-bold">
                Đăng ký tài khoản người hướng dẫn
              </h2>
              <span className="mt-2 block text-sm">
                Cùng nhau tạo dựng lợi thế cho nền tảng học trực tuyến hàng đầu
                tại Việt Nam
              </span>
            </div>
          </div>
          <div className="mt-4">
            <Accordion
              type="single"
              collapsible
              className="rounded-lg border border-primary"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="border-none text-xl">
                  Quy định
                </AccordionTrigger>
                <AccordionContent className="!mt-0 border-none !p-4 text-sm">
                  <div className="py-3">
                    Để đảm bảo chất lượng dịch vụ, CourseMeLy{' '}
                    <span className="text-[#da4538]">
                      không cho phép một người dùng tạo nhiều tài khoản khác
                      nhau
                    </span>
                  </div>
                  <div className="py-3">
                    Nếu phát hiện vi phạm, CourseMeLy sẽ ngừng cung cấp dịch vụ
                    tới tất cả các tài khoản trùng lặp hoặc chặn toàn bộ truy
                    cập tới hệ thống website của CourseMeLy.
                  </div>
                  <div className="py-3">
                    Sau khi đăng ký tài khoản giảng viên và cung cấp thông tin
                    cần thiết cho CourseMeLy, bạn sẽ được chuyển đến trang quản
                    lý khóa học để bắt đầu tạo khóa học của mình.
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <form>
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Tài khoản</h2>
              <div className="mt-4">
                <div className="mb-4">
                  <Label htmlFor="email">Email</Label>
                  <Input name="email" type="email" placeholder="Email" />
                </div>
                <div className="mb-4">
                  <Label htmlFor="email">Mật khẩu</Label>
                  <PasswordInput
                    name="password"
                    type="password"
                    placeholder="Mật khẩu"
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="email">Xác nhận mật khẩu</Label>
                  <PasswordInput
                    name="confirmPassword"
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Thông tin người hướng dẫn</h2>
              <span className="mt-2 block">
                Vui lòng cung cấp thông tin cá nhân của bạn để chúng tôi có thể
                xác nhận và giúp bạn trở thành người hướng dẫn. Chúng tôi sẽ xem
                xét hồ sơ của bạn và phản hồi trong thời gian sớm nhất. Cảm ơn
                bạn đã hợp tác!
              </span>
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <Label htmlFor="email">Họ và tên</Label>
                    <PasswordInput
                      name="name"
                      type="text"
                      placeholder="Họ và tên"
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="email">Số điện thoại</Label>
                    <PasswordInput
                      name="phone"
                      type="text"
                      placeholder="Số điện thoại"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Checkbox />
              <Label className="ml-2">
                {' '}
                Tôi đã đọc và đồng ý với các điều khoản và quy định của
                CourseMeLy
              </Label>
            </div>
            <div>
              <Button className="mt-4 w-full" type="submit">
                Hoàn tất
              </Button>
              <div className="text-center">
                <span className="mt-4 block">
                  Bạn đã có tài khoản người học?{' '}
                  <Link className="text-primary" href="/sign-in">
                    Đăng nhập
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </div>
        <div className="col-span-3">
          <Swiper
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="size-full"
          >
            <SwiperSlide>
              <Image
                src="/assets/images/page-title/page-title-home2-1.jpg"
                alt="Slide 1"
                layout="fill"
                objectFit="cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/assets/images/page-title/page-title-home2-2.jpg"
                alt="Slide 2"
                layout="fill"
                objectFit="cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default BecomeAnInstructor
