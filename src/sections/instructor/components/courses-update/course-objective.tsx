import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CirclePlus, Loader2, Trash } from 'lucide-react'
import { useForm, useFieldArray } from 'react-hook-form'

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
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from '@/components/ui/sortable'
import { GripVertical } from 'lucide-react'

const CourseObjective = ({ courseObjective }: any) => {
  const {
    mutate: updateCourseObjective,
    isPending: updateCourseObjectivePending,
  } = useUpdateCourseObjective()

  const form = useForm<UpdateCourseObjectivePayload>({
    resolver: zodResolver(updateCourseObjectiveSchema),
    defaultValues: {
      benefits: Array(4).fill({ value: '' }),
      requirements: Array(4).fill({ value: '' }),
      qa: [{ question: '', answer: '' }],
    },
  })

  const isReadOnly = !(
    courseObjective?.status === 'draft' ||
    courseObjective?.status === 'rejected'
  )

  const {
    fields: benefitFields,
    append: appendBenefit,
    remove: removeBenefit,
    move: moveBenefit,
  } = useFieldArray({
    control: form.control,
    name: 'benefits',
  })

  const {
    fields: requirementFields,
    append: appendRequirement,
    remove: removeRequirement,
    move: moveRequirement,
  } = useFieldArray({
    control: form.control,
    name: 'requirements',
  })

  const {
    fields: qaFields,
    append: appendQA,
    remove: removeQA,
    move: moveQA,
  } = useFieldArray({
    control: form.control,
    name: 'qa',
  })

  useEffect(() => {
    if (courseObjective) {
      form.reset({
        benefits: courseObjective.benefits?.length
          ? courseObjective.benefits.map((benefit: string) => ({
              value: benefit,
            }))
          : Array(4).fill({ value: '' }),

        requirements: courseObjective.requirements?.length
          ? courseObjective.requirements.map((requirement: string) => ({
              value: requirement,
            }))
          : Array(4).fill({ value: '' }),

        qa: courseObjective.qa?.length
          ? courseObjective.qa
          : [{ question: '', answer: '' }],
      })
    }
  }, [courseObjective, form])

  const handleAddBenefit = () => {
    if (benefitFields.length < 10) {
      appendBenefit({ value: '' })
    }
  }

  const handleAddRequirement = () => {
    if (requirementFields.length < 10) {
      appendRequirement({ value: '' })
    }
  }

  const handleAddQA = () => {
    if (qaFields.length < 10) {
      appendQA({ question: '', answer: '' })
    }
  }

  const onSubmit = (data: UpdateCourseObjectivePayload) => {
    const formData = {
      benefits: data.benefits.filter((benefit) => benefit.value.trim() !== ''),
      requirements: data.requirements.filter(
        (requirement) => requirement.value.trim() !== ''
      ),
      qa: data.qa?.filter(
        (faq) => faq.question.trim() !== '' && faq.answer.trim() !== ''
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
          <div className="flex flex-col justify-between gap-4 lg:flex-row">
            <div>
              <h3 className="text-xl font-bold">Thông tin khoá học</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Thông tin sẽ được hiển thị trên trang Tổng quan, dễ dàng tiếp
                cận Học viên hơn.
              </p>
            </div>
            {(courseObjective?.status === 'draft' ||
              courseObjective?.status === 'rejected') && (
              <div className="lg:flex-col lg:items-end">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => form.reset()}
                >
                  Nhập lại
                </Button>
                <Button
                  className="ml-2 lg:order-first"
                  type="submit"
                  disabled={updateCourseObjectivePending}
                >
                  {updateCourseObjectivePending && (
                    <Loader2 className="mr-2 animate-spin" />
                  )}
                  Lưu thông tin
                </Button>
              </div>
            )}
          </div>
          <div className="mt-4">
            <div>
              <FormField
                control={form.control}
                name="benefits"
                render={() => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormLabel>Lợi ích mà khóa học mang lại</FormLabel>
                      {!isReadOnly && (
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          disabled={benefitFields.length >= 10}
                          onClick={handleAddBenefit}
                          className="size-6"
                        >
                          <CirclePlus className="size-3.5" />
                        </Button>
                      )}
                    </div>
                    <p className="text-[14px] text-[#4b5563]">
                      Bạn phải nhập ít nhất 4 lợi ích mà Học viên có thể nhận
                      được sau khi kết thúc khóa học.
                    </p>
                    <FormControl>
                      <Sortable
                        value={benefitFields}
                        onMove={({ activeIndex, overIndex }) =>
                          moveBenefit(activeIndex, overIndex)
                        }
                        orientation="vertical"
                      >
                        {benefitFields.map((field, index) => (
                          <SortableItem key={field.id} value={field.id} asChild>
                            <div className="mt-3 grid grid-cols-[1fr,auto,auto] items-center gap-2">
                              <FormField
                                control={form.control}
                                name={`benefits.${index}.value`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder={`Nhập lợi ích số ${index + 1}`}
                                        className="h-[40px]"
                                        readOnly={isReadOnly}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              {!isReadOnly && (
                                <>
                                  <SortableDragHandle
                                    disabled={updateCourseObjectivePending}
                                  >
                                    <GripVertical className="cursor-grab" />
                                  </SortableDragHandle>
                                  <Button
                                    variant="ghost"
                                    type="button"
                                    size="icon"
                                    className="text-red-500 hover:text-red-500/80"
                                    disabled={
                                      benefitFields.length <= 4 ||
                                      updateCourseObjectivePending
                                    }
                                    onClick={() => removeBenefit(index)}
                                  >
                                    <Trash className="size-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </SortableItem>
                        ))}
                      </Sortable>
                    </FormControl>
                    {benefitFields.length >= 10 && !isReadOnly && (
                      <p className="mt-2 text-sm text-red-500">
                        Bạn đã đạt tối đa 10 lợi ích.
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6">
              <FormField
                control={form.control}
                name="requirements"
                render={() => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormLabel>Yêu cầu khi tham gia khóa học</FormLabel>
                      {!isReadOnly && (
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          disabled={requirementFields.length >= 10}
                          onClick={handleAddRequirement}
                          className="size-6"
                        >
                          <CirclePlus className="size-3.5" />
                        </Button>
                      )}
                    </div>
                    <p className="text-[14px] text-[#4b5563]">
                      Liệt kê các kỹ năng, kinh nghiệm, công cụ hoặc thiết bị mà
                      học viên bắt buộc phải có trước khi tham gia khóa học.
                    </p>
                    <FormControl>
                      <Sortable
                        value={requirementFields}
                        onMove={({ activeIndex, overIndex }) =>
                          moveRequirement(activeIndex, overIndex)
                        }
                        orientation="vertical"
                      >
                        {requirementFields.map((field, index) => (
                          <SortableItem key={field.id} value={field.id} asChild>
                            <div className="mt-3 grid grid-cols-[1fr,auto,auto] items-center gap-2">
                              <FormField
                                control={form.control}
                                name={`requirements.${index}.value`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder={`Nhập yêu cầu số ${index + 1}`}
                                        className="h-[40px]"
                                        readOnly={isReadOnly}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              {!isReadOnly && (
                                <>
                                  <SortableDragHandle
                                    disabled={updateCourseObjectivePending}
                                  >
                                    <GripVertical className="cursor-grab" />
                                  </SortableDragHandle>
                                  <Button
                                    variant="ghost"
                                    type="button"
                                    size="icon"
                                    className="text-red-500 hover:text-red-500/80"
                                    disabled={
                                      requirementFields.length <= 4 ||
                                      updateCourseObjectivePending
                                    }
                                    onClick={() => removeRequirement(index)}
                                  >
                                    <Trash className="size-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </SortableItem>
                        ))}
                      </Sortable>
                    </FormControl>
                    {requirementFields.length >= 10 && !isReadOnly && (
                      <p className="mt-2 text-sm text-red-500">
                        Bạn đã đạt tối đa 10 yêu cầu.
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6">
              <FormField
                control={form.control}
                name="qa"
                render={() => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormLabel>Câu hỏi thường gặp</FormLabel>
                      {!isReadOnly && (
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          disabled={qaFields.length >= 10}
                          onClick={handleAddQA}
                          className="size-6"
                        >
                          <CirclePlus className="size-3.5" />
                        </Button>
                      )}
                    </div>
                    <p className="text-[14px] text-[#4b5563]">
                      Thêm các câu hỏi và câu trả lời thường gặp về khóa học.
                    </p>
                    <FormControl>
                      <Sortable
                        value={qaFields}
                        onMove={({ activeIndex, overIndex }) =>
                          moveQA(activeIndex, overIndex)
                        }
                        orientation="vertical"
                      >
                        {qaFields.map((field, index) => (
                          <SortableItem key={field.id} value={field.id} asChild>
                            <div className="mt-3">
                              <div className="mb-2 grid grid-cols-[1fr,auto,auto] items-center gap-2">
                                <FormField
                                  control={form.control}
                                  name={`qa.${index}.question`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          placeholder={`Câu hỏi ${index + 1}`}
                                          className="h-[40px]"
                                          readOnly={isReadOnly}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                {!isReadOnly && (
                                  <>
                                    <SortableDragHandle
                                      disabled={updateCourseObjectivePending}
                                    >
                                      <GripVertical className="cursor-grab" />
                                    </SortableDragHandle>
                                    <Button
                                      variant="ghost"
                                      type="button"
                                      size="icon"
                                      className="text-red-500 hover:text-red-500/80"
                                      disabled={
                                        qaFields.length <= 1 ||
                                        updateCourseObjectivePending
                                      }
                                      onClick={() => removeQA(index)}
                                    >
                                      <Trash className="size-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                              <div className="pl-0 md:pl-4">
                                <FormField
                                  control={form.control}
                                  name={`qa.${index}.answer`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          placeholder={`Câu trả lời ${index + 1}`}
                                          className="h-[40px]"
                                          readOnly={isReadOnly}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </SortableItem>
                        ))}
                      </Sortable>
                    </FormControl>
                    {qaFields.length >= 10 && !isReadOnly && (
                      <p className="mt-2 text-sm text-red-500">
                        Bạn đã đạt tối đa 10 câu hỏi.
                      </p>
                    )}
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
