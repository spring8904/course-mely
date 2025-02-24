'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

import {
  RegisterInstructorInput,
  registerInstructorSchema,
} from '@/validations/instructor'
import { questions } from '@/constants/common'
import { cn } from '@/lib/utils'
import { useInstructorRegister } from '@/hooks/instructor/instructor-register/useInstructorRegister'
import { useGetQaSystems } from '@/hooks/qa-system/useQaSystem'

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
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import ModalOption from '@/sections/become-an-instructor/_components/modal-option'

import 'swiper/css'
import 'swiper/css/autoplay'

const BecomeAnInstructor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState(1)

  const { data: qaSystems } = useGetQaSystems()
  const { mutate: registerInstructor } = useInstructorRegister()

  const form = useForm<RegisterInstructorInput>({
    resolver: zodResolver(registerInstructorSchema),
    mode: 'onTouched',
    defaultValues: {
      qa_systems: questions.map((question) => ({
        question: question.question,
        options: question.options,
        selected_options: [],
      })),
      certificates: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'certificates',
  })

  const onSubmit = (values: RegisterInstructorInput) => {
    registerInstructor(values)
  }

  useEffect(() => {
    // setIsModalOpen(true)
  }, [])

  return (
    <>
      <ModalOption isOpen={isModalOpen} setIsOpen={setIsModalOpen} />

      <div className={cn('fixed left-0 top-0 z-50 w-full bg-white')}>
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
              Bước {step}/{qaSystems?.data.length + 1}
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
            step === qaSystems?.data.length + 1
              ? 100
              : (step / (qaSystems?.data.length + 1)) * 100
          }
          className="h-1 bg-gray-300"
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="container mx-auto my-20 p-8 pb-16">
            <h1 className="bold text-3xl">Chia sẻ kiến thức của bạn</h1>

            <p className="mb-16 mt-8 max-w-3xl">
              Các khóa học trên CourseMely đều mang lại trải nghiệm học tập bằng
              cách xem video. Điều này giúp học viên có cơ hội học kỹ năng dễ
              thực hành. Dù bạn đã có kinh nghiệm giảng dạy hay đây là lần đầu
              tiên bạn giảng dạy, thì chúng tôi sẽ giúp bạn đưa kiến thức của
              mình vào khóa học online để cải thiện cuộc sống của học viên.
            </p>

            {qaSystems?.data.map((question: any, questionIndex: number) => (
              <div
                className={cn(
                  'max-w-3xl',
                  step !== questionIndex + 1 && 'hidden'
                )}
                key={question.id}
              >
                {question.answer_type === 'single' ? (
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
                            {JSON.parse(question.options).map(
                              (option: string, optionIndex: number) => (
                                <FormItem key={optionIndex}>
                                  <FormLabel className="flex cursor-pointer items-center space-x-4 rounded border p-4 font-normal">
                                    <FormControl>
                                      <RadioGroupItem
                                        value={optionIndex.toString()}
                                      />
                                    </FormControl>
                                    <span>{option}</span>
                                  </FormLabel>
                                </FormItem>
                              )
                            )}
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
                        {JSON.parse(question.options).map(
                          (option: string, optionIndex: number) => (
                            <FormField
                              key={`${question.id}-${optionIndex}`}
                              control={form.control}
                              name={`qa_systems.${questionIndex}.selected_options`}
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={`${question.id}-${optionIndex}`}
                                  >
                                    <FormLabel className="flex cursor-pointer items-center space-x-4 rounded border p-4 font-normal">
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
                                                  (value) =>
                                                    value !== optionIndex
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
                          )
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            ))}

            <div
              className={cn(
                'max-w-3xl',
                step !== qaSystems?.data.length + 1 && 'hidden'
              )}
            >
              <FormField
                control={form.control}
                name="certificates"
                render={() => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-lg font-semibold">
                      Thêm chứng chỉ{' '}
                      <span className="text-sm text-muted-foreground">
                        (Không bắt buộc)
                      </span>
                    </FormLabel>
                    {fields.map((field, index) => (
                      <FormField
                        key={field.id}
                        control={form.control}
                        name={`certificates.${index}.file`}
                        render={({
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          field: { value, onChange, ...fieldProps },
                        }) => (
                          <FormItem>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...fieldProps}
                                  type="file"
                                  onChange={(e) => {
                                    onChange(
                                      e.target.files && e.target.files[0]
                                    )
                                  }}
                                  accept="image/*, application/pdf"
                                  className="pr-10"
                                />
                              </FormControl>

                              <Button
                                variant="ghost"
                                type="button"
                                size="icon"
                                className="absolute right-0 top-0 text-destructive hover:bg-transparent hover:text-destructive/80"
                                onClick={() => {
                                  remove(index)
                                }}
                                disabled={fieldProps.disabled}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}

                    <Button
                      className="block"
                      type="button"
                      variant="secondary"
                      onClick={() => append({ file: undefined })}
                    >
                      <Plus />
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>

      <div
        className="fixed bottom-0 left-0 z-50 w-full bg-white"
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
                if (step === qaSystems?.data.length + 1) {
                  Swal.fire({
                    title: 'Xác nhận đăng ký',
                    text: 'Bạn có chắc muốn đăng ký làm người hướng dẫn?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Hủy',
                    preConfirm: async () => {
                      await form.handleSubmit(onSubmit)()
                    },
                  })
                } else {
                  setStep(step + 1)
                }
              }}
              disabled={
                step !== qaSystems?.data.length + 1
                  ? form.getValues('qa_systems')[step - 1].selected_options
                      .length === 0
                  : false
              }
            >
              {step === qaSystems?.data.length + 1
                ? 'Đăng ký giảng viên'
                : 'Tiếp tục'}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BecomeAnInstructor
