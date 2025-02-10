'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { questions } from '@/constants/common'
import { cn } from '@/lib/utils'
import {
  RegisterInstructorInput,
  registerInstructorSchema,
} from '@/validations/instructor'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import ModalOption from '@/sections/become-an-instructor/_components/modal-option'

import 'swiper/css'
import 'swiper/css/autoplay'

const BecomeAnInstructor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState(1)

  const form = useForm<RegisterInstructorInput>({
    resolver: zodResolver(registerInstructorSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
      qa_systems: questions.map((question) => ({
        question: question.question,
        options: question.options,
        selected_options: [],
      })),
    },
  })

  const onSubmit = (values: RegisterInstructorInput) => {
    console.group('Register Instructor')
    console.log(values)
    console.groupEnd()
  }

  useEffect(() => {
    // setIsModalOpen(true)
  }, [])

  return (
    <>
      <ModalOption isOpen={isModalOpen} setIsOpen={setIsModalOpen} />

      <div
        className={cn(
          'fixed left-0 top-0 z-50 w-full bg-white',
          step > questions.length && 'hidden'
        )}
      >
        <div className="container mx-auto px-8">
          <div className="flex h-20 w-full items-center space-x-6">
            <Link href="/">
              <Image
                src="/images/logo/logo.svg"
                width={200}
                height={200}
                alt=""
              />
            </Link>

            <div className="flex h-full flex-1 items-center border-l border-gray-200 px-6 text-lg">
              Bước {step}/{questions.length}
            </div>

            <Link
              href="/"
              className="rounded-lg px-4 py-2 font-semibold text-orange-500 hover:bg-orange-50"
            >
              Thoát
            </Link>
          </div>
        </div>

        <Progress
          value={
            step === questions.length ? 100 : (step / questions.length) * 100
          }
          className="h-1 bg-gray-300"
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div
            className={cn(
              'container mx-auto my-20 px-8 py-16',
              step > questions.length && 'hidden'
            )}
          >
            <h1 className="bold text-3xl">Chia sẻ kiến thức của bạn</h1>

            <p className="mb-16 mt-8 max-w-3xl">
              Các khóa học trên CourseMely đều mang lại trải nghiệm học tập bằng
              cách xem video. Điều này giúp học viên có cơ hội học kỹ năng dễ
              thực hành. Dù bạn đã có kinh nghiệm giảng dạy hay đây là lần đầu
              tiên bạn giảng dạy, thì chúng tôi sẽ giúp bạn đưa kiến thức của
              mình vào khóa học online để cải thiện cuộc sống của học viên.
            </p>

            {questions.map((question, questionIndex) => (
              <div
                className={cn('w-1/2', step - 1 !== questionIndex && 'hidden')}
                key={question.id}
              >
                {question.options.length === 2 ? (
                  <FormField
                    control={form.control}
                    name={`qa_systems.${questionIndex}.selected_options`}
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          {question.title}
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            className="flex flex-col gap-4"
                            onValueChange={(value) => {
                              field.onChange([parseInt(value)])
                              field.onBlur()
                            }}
                            defaultValue={field.value[0]?.toString()}
                          >
                            {question.options.map((option, optionIndex) => (
                              <FormItem key={optionIndex}>
                                <FormLabel className="flex items-center space-x-4 rounded border p-4 font-normal">
                                  <FormControl>
                                    <RadioGroupItem
                                      value={optionIndex.toString()}
                                    />
                                  </FormControl>
                                  <span>{option}</span>
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    control={form.control}
                    name={`qa_systems.${questionIndex}.selected_options`}
                    render={() => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          {question.title}
                        </FormLabel>
                        {question.options.map((option, optionIndex) => (
                          <FormField
                            key={`${question.id}-${optionIndex}`}
                            control={form.control}
                            name={`qa_systems.${questionIndex}.selected_options`}
                            render={({ field }) => {
                              return (
                                <FormItem key={`${question.id}-${optionIndex}`}>
                                  <FormLabel className="flex items-center space-x-4 rounded border p-4 font-normal">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value.includes(
                                          optionIndex
                                        )}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            field.onChange([
                                              ...field.value,
                                              optionIndex,
                                            ])
                                          } else {
                                            field.onChange(
                                              field.value?.filter(
                                                (value) => value !== optionIndex
                                              )
                                            )
                                          }
                                          field.onBlur()
                                        }}
                                      />
                                    </FormControl>
                                    <span>{option}</span>
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div
            className={cn(
              'grid grid-cols-12',
              step <= questions.length && 'hidden'
            )}
          >
            <div className="col-span-9 space-y-8 p-8 pb-16">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Link href="/">
                    <Image
                      src="/images/logo/logo.svg"
                      width={200}
                      height={200}
                      alt=""
                    />
                  </Link>

                  <Button
                    type="button"
                    variant="link"
                    className="text-lg"
                    onClick={() => setStep(step - 1)}
                  >
                    Quay lại
                  </Button>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">
                    Đăng ký tài khoản người hướng dẫn
                  </h2>
                  <span className="block text-sm">
                    Cùng nhau tạo dựng lợi thế cho nền tảng học trực tuyến hàng
                    đầu tại Việt Nam
                  </span>
                </div>
              </div>

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
                      Nếu phát hiện vi phạm, CourseMeLy sẽ ngừng cung cấp dịch
                      vụ tới tất cả các tài khoản trùng lặp hoặc chặn toàn bộ
                      truy cập tới hệ thống website của CourseMeLy.
                    </div>
                    <div className="py-3">
                      Sau khi đăng ký tài khoản giảng viên và cung cấp thông tin
                      cần thiết cho CourseMeLy, bạn sẽ được chuyển đến trang
                      quản lý khóa học để bắt đầu tạo khóa học của mình.
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Tài khoản</h2>
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Nhập mật khẩu"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nhập lại mật khẩu</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Nhập mật khẩu"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">
                    Thông tin người hướng dẫn
                  </h2>
                  <p>
                    Vui lòng cung cấp thông tin cá nhân của bạn để chúng tôi có
                    thể xác nhận và giúp bạn trở thành người hướng dẫn. Chúng
                    tôi sẽ xem xét hồ sơ của bạn và phản hồi trong thời gian sớm
                    nhất. Cảm ơn bạn đã hợp tác!
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 space-x-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ và tên</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập họ tên" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập số điện thoại" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập địa chỉ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <Button className="w-full" type="submit">
                  Đăng ký
                </Button>

                <p className="mt-2 text-center text-sm">
                  Bằng việc đăng ký, bạn đồng ý với các điều khoản và quy định
                  của CourseMeLy
                </p>

                <div className="mt-4 rounded-lg bg-secondary py-4 text-center">
                  Bạn đã có tài khoản người học?{' '}
                  <Link className="text-primary" href="/sign-in">
                    Đăng nhập
                  </Link>
                </div>
              </div>
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
        </form>
      </Form>

      <div
        className={cn(
          'fixed bottom-0 left-0 z-50 w-full bg-white',
          step > questions.length && 'hidden'
        )}
        style={{
          boxShadow:
            '0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1)',
        }}
      >
        <div className="container mx-auto px-8">
          <div className="flex h-20 w-full items-center justify-between">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                Quay lại
              </Button>
            )}

            <Button
              type="button"
              onClick={() => {
                setStep(step + 1)
              }}
              disabled={
                step > questions.length ||
                form.getValues('qa_systems')[step - 1].selected_options
                  .length === 0
              }
            >
              Tiếp tục
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BecomeAnInstructor
