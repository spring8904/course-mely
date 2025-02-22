import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CirclePlus, Loader2, Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useImmer } from 'use-immer'

import {
  UpdateCourseObjectivePayload,
  updateCourseObjectiveSchema,
} from '@/validations/course'
import { useUpdateCourseObjective } from '@/hooks/instructor/course/useCourse'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface FAQ {
  question: string
  answers: string
}

const CourseObjective = ({ courseObjective }: any) => {
  const [benefits, setBenefits] = useState<string[]>(['', '', '', ''])
  const [requirements, setRequirements] = useState<string[]>([''])
  const [qa, setFaqs] = useImmer<FAQ[]>([{ question: '', answers: '' }])

  const {
    mutate: updateCourseObjective,
    isPending: updateCourseObjectivePending,
  } = useUpdateCourseObjective()

  const form = useForm<UpdateCourseObjectivePayload>({
    resolver: zodResolver(updateCourseObjectiveSchema),
    defaultValues: {
      benefits: ['', '', '', ''],
      requirements: [''],
      qa: [{ question: '', answers: '' }],
    },
  })

  const isReadOnly = !(
    courseObjective?.status === 'draft' ||
    courseObjective?.status === 'rejected'
  )

  useEffect(() => {
    if (courseObjective) {
      const data = courseObjective

      form.reset({
        benefits: data.benefits || ['', '', '', ''],
        requirements: data.requirements || [''],
        qa: data.qa || [{ question: '', answers: '' }],
      })

      setBenefits(
        Array.isArray(data.benefits) ? data.benefits : ['', '', '', '']
      )
      setRequirements(
        Array.isArray(data.requirements) ? data.requirements : ['']
      )
      setFaqs(
        Array.isArray(data.qa) ? data.qa : [{ question: '', answers: '' }]
      )
    }
  }, [courseObjective, form, setFaqs])

  const handleAddBenefit = () => {
    if (benefits.length < 10) {
      setBenefits((prev) => {
        const newBenefits = [...prev, '']
        form.setValue('benefits', newBenefits)
        return newBenefits
      })
    }
  }

  const handleAddRequirement = () => {
    if (requirements.length < 10) {
      setRequirements((prev) => {
        const newRequirements = [...prev, '']
        form.setValue('requirements', newRequirements)
        return newRequirements
      })
    }
  }

  const handleAddQA = () => {
    if (qa.length < 10) {
      setFaqs((draft) => {
        draft.push({ question: '', answers: '' })
      })
      form.setValue('qa', [...qa, { question: '', answers: '' }])
    }
  }

  const handleRemoveBenefit = (index: number) => {
    setBenefits((prev) => {
      const newBenefits = prev.filter((_, i) => i !== index)
      form.setValue('benefits', newBenefits)
      return newBenefits
    })
  }

  const handleRemoveRequirement = (index: number) => {
    setRequirements((prev) => {
      const newRequirements = prev.filter((_, i) => i !== index)
      form.setValue('requirements', newRequirements)
      return newRequirements
    })
  }

  const handleRemoveQA = (index: number) => {
    setFaqs((draft) => {
      draft.splice(index, 1)
    })
    form.setValue(
      'qa',
      qa.filter((_, i) => i !== index)
    )
  }

  const onSubmit = (data: UpdateCourseObjectivePayload) => {
    const formData = {
      ...data,
      benefits: benefits.filter((benefit) => benefit.trim() !== ''),
      requirements: requirements.filter(
        (requirement) => requirement.trim() !== ''
      ),
      qa: qa.filter(
        (faq) => faq.question.trim() !== '' && faq.answers.trim() !== ''
      ),
    }
    updateCourseObjective({
      slug: courseObjective.slug,
      data: formData,
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Thông tin khoá học</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Thông tin sẽ được hiển thị trên trang Tổng quan, dễ dàng tiếp
                cận Học viên hơn.
              </p>
            </div>
            {(courseObjective?.status === 'draft' ||
              courseObjective?.status === 'rejected') && (
              <div>
                <Button variant="destructive">Nhập lại</Button>
                <Button
                  type="submit"
                  className="ms-2 bg-primary"
                  disabled={updateCourseObjectivePending}
                >
                  {updateCourseObjectivePending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Lưu thông tin'
                  )}
                </Button>
              </div>
            )}
          </div>
          <div className="mt-4">
            <div>
              <FormField
                control={form.control}
                name="benefits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lợi ích mà khóa học mang lại</FormLabel>
                    <p className="text-[14px] text-[#4b5563]">
                      Bạn phải nhập ít nhất 4 lợi ích mà Học viên có thể nhận
                      được sau khi kết thúc khóa học.
                    </p>
                    <FormControl>
                      <div>
                        {benefits.map((benefit, index) => (
                          <div key={index} className="relative mt-3">
                            <Input
                              {...field}
                              placeholder={`Nhập lợi ích số ${index + 1}`}
                              className="h-[40px] pr-10"
                              value={benefit}
                              onChange={(e) => {
                                const newBenefits = [...benefits]
                                newBenefits[index] = e.target.value
                                setBenefits(newBenefits)
                                form.setValue('benefits', newBenefits)
                              }}
                              readOnly={isReadOnly}
                            />
                            {index >= 4 &&
                              (courseObjective?.status === 'draft' ||
                                courseObjective?.status === 'rejected') && (
                                <button
                                  type="button"
                                  className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500"
                                  onClick={() => handleRemoveBenefit(index)}
                                >
                                  <Trash size={16} />
                                </button>
                              )}
                          </div>
                        ))}
                        {(courseObjective?.status === 'draft' ||
                          courseObjective?.status === 'rejected') && (
                          <div className="mt-3">
                            <Button
                              type="button"
                              disabled={benefits.length >= 10}
                              onClick={handleAddBenefit}
                            >
                              <CirclePlus size={18} />
                              Thêm lợi ích vào khóa học của bạn
                            </Button>
                            {benefits.length >= 10 && (
                              <p className="mt-2 text-sm text-red-500">
                                Bạn đã đạt tối đa 10 lợi ích.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-6">
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yêu cầu khi tham gia khóa học</FormLabel>
                    <p className="text-[14px] text-[#4b5563]">
                      Liệt kê các kỹ năng, kinh nghiệm, công cụ hoặc thiết bị mà
                      học viên bắt buộc phải có trước khi tham gia khóa học.
                    </p>
                    <FormControl>
                      <div>
                        {requirements.map((requirement, index) => (
                          <div key={index} className="relative mt-3">
                            <Input
                              {...field}
                              placeholder={`Nhập yêu cầu số ${index + 1}`}
                              className="h-[40px] pr-10"
                              value={requirement}
                              onChange={(e) => {
                                const newRequirements = [...requirements]
                                newRequirements[index] = e.target.value
                                setRequirements(newRequirements)
                                form.setValue('requirements', newRequirements)
                              }}
                              readOnly={isReadOnly}
                            />
                            {index >= 1 &&
                              (courseObjective?.status === 'draft' ||
                                courseObjective?.status === 'rejected') && (
                                <button
                                  type="button"
                                  className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500"
                                  onClick={() => handleRemoveRequirement(index)}
                                >
                                  <Trash size={16} />
                                </button>
                              )}
                          </div>
                        ))}
                        {(courseObjective?.status === 'draft' ||
                          courseObjective?.status === 'rejected') && (
                          <div className="mt-3">
                            <Button
                              type="button"
                              disabled={requirements.length >= 10}
                              onClick={handleAddRequirement}
                            >
                              <CirclePlus size={18} />
                              Thêm yêu cầu vào khóa học của bạn
                            </Button>
                            {requirements.length >= 10 && (
                              <p className="mt-2 text-sm text-red-500">
                                Bạn đã đạt tối đa 10 yêu cầu.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-6">
              <FormField
                control={form.control}
                name="qa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Câu hỏi thường gặp</FormLabel>
                    <p className="text-[14px] text-[#4b5563]">
                      Thêm các câu hỏi và câu trả lời thường gặp về khóa học.
                    </p>
                    <FormControl>
                      <div>
                        {qa.map((faq, index) => (
                          <div
                            key={index}
                            className="relative mt-3 grid grid-cols-2 gap-2"
                          >
                            <Input
                              placeholder={`Câu hỏi ${index + 1}`}
                              className="h-[40px]"
                              value={faq.question}
                              onChange={(e) => {
                                setFaqs((draft) => {
                                  draft[index].question = e.target.value
                                })
                                field.onChange(qa)
                              }}
                              readOnly={isReadOnly}
                            />
                            <div className="relative">
                              <Input
                                placeholder={`Câu trả lời ${index + 1}`}
                                className="h-[40px] pr-10"
                                value={faq.answers}
                                onChange={(e) => {
                                  setFaqs((draft) => {
                                    draft[index].answers = e.target.value
                                  })
                                  field.onChange(qa)
                                }}
                              />
                              {index >= 1 &&
                                (courseObjective?.status === 'draft' ||
                                  courseObjective?.status === 'rejected') && (
                                  <button
                                    type="button"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500"
                                    onClick={() => handleRemoveQA(index)}
                                  >
                                    <Trash size={16} />
                                  </button>
                                )}
                            </div>
                          </div>
                        ))}
                        {(courseObjective?.status === 'draft' ||
                          courseObjective?.status === 'rejected') && (
                          <div className="mt-3">
                            <Button
                              type="button"
                              disabled={qa.length >= 10}
                              onClick={handleAddQA}
                            >
                              <CirclePlus size={18} />
                              Thêm câu hỏi và câu trả lời
                            </Button>
                            {qa.length >= 10 && (
                              <p className="mt-2 text-sm text-red-500">
                                Bạn đã đạt tối đa 10 câu hỏi.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}

export default CourseObjective
