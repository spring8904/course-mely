import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ImagePlus, Loader2, Plus, Trash2, X } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { StoreQuestionPayload, storeQuestionSchema } from '@/validations/lesson'
import {
  useCreateQuestion,
  useGetQuestion,
  useUpdateQuestion,
} from '@/hooks/instructor/quiz/useQuiz'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import TinyEditor from '@/components/shared/tiny-editor'

type Props = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  isEdit?: boolean
  questionId?: string
  quizId: string
}

const colors = [
  'bg-[#2196F3]',
  'bg-[#26A69A]',
  'bg-[#FFA726]',
  'bg-[#EF5350]',
  'bg-[#AB47BC]',
]

const AddQuestionDialog = ({
  isOpen,
  isEdit,
  quizId,
  onOpenChange,
  questionId,
}: Props) => {
  const [image, setImage] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const { data: questionData, isLoading: isQuestionLoading } = useGetQuestion(
    questionId as string
  )
  const { mutate: createQuestion, isPending: isQuestionCreatePending } =
    useCreateQuestion()
  const { mutate: updateQuestion, isPending: isQuestionUpdatePending } =
    useUpdateQuestion()

  const form = useForm<StoreQuestionPayload>({
    resolver: zodResolver(storeQuestionSchema),
    defaultValues: {
      question: '',
      description: '',
      answer_type: 'single_choice',
      options: [
        { answer: '', is_correct: false },
        { answer: '', is_correct: false },
        { answer: '', is_correct: false },
        { answer: '', is_correct: false },
      ],
      image: undefined,
    },
  })

  useEffect(() => {
    if (isEdit && questionData?.data) {
      const options = questionData.data.answers.map((opt: any) => ({
        answer: opt.answer,
        is_correct: !!opt.is_correct,
      })) || [
        { answer: '', is_correct: false },
        { answer: '', is_correct: false },
        { answer: '', is_correct: false },
        { answer: '', is_correct: false },
      ]

      form.reset({
        question: questionData.data.question,
        description: questionData.data.description,
        answer_type: questionData.data.answer_type,
        options,
        image: questionData.data.image,
      })

      setImage(questionData.data.image)
    }
  }, [isEdit, questionData, form])

  useEffect(() => {
    if (form.getValues('answer_type') === 'single_choice') {
      const options = form.getValues('options').map((opt) => ({
        ...opt,
        is_correct: false,
      }))
      form.setValue('options', options, { shouldValidate: true })
    }
  }, [form.watch('answer_type')])

  const handleChangeOption = (optionIndex: number, value: string) => {
    const options = form.getValues('options')
    options[optionIndex].answer = value
    form.setValue('options', [...options])
  }

  const handleSelectCorrectAnswer = (selectedIndex: number) => {
    const options = form.getValues('options').map((opt, i) => ({
      ...opt,
      is_correct: i === selectedIndex,
    }))

    form.setValue('options', options, { shouldValidate: true })
  }

  const handleToggleCorrectAnswer = (optionIndex: number) => {
    const options = form.getValues('options')

    if (form.getValues('answer_type') === 'single_choice') {
      options.forEach((opt, i) => {
        opt.is_correct = i === optionIndex
      })
    } else {
      options[optionIndex].is_correct = !options[optionIndex].is_correct
    }

    form.setValue('options', [...options], { shouldValidate: true })
  }

  const handleAddAnswer = () => {
    const options = form.getValues('options')
    if (options.length < 5) {
      const newOption = { answer: '', is_correct: false }
      form.setValue('options', [...options, newOption])
    }
  }

  const handleDeleteAnswer = (optionIndex: number) => {
    const options = form.getValues('options')
    if (options.length > 1) {
      const newOptions = options.filter((_, i) => i !== optionIndex)
      form.setValue('options', newOptions)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteImage = () => {
    setImage(null)
  }

  const openImageModal = () => {
    setModalOpen(true)
  }

  const closeImageModal = () => {
    setModalOpen(false)
  }

  const handleCloseOrCancel = () => {
    form.reset()
    setImage(null)
  }

  const onSubmit = (data: StoreQuestionPayload) => {
    if (isQuestionCreatePending) return

    if (isEdit && questionData?.data) {
      updateQuestion(
        {
          questionId: questionData.data.id,
          payload: data,
        },
        {
          onSuccess: () => {
            handleCloseOrCancel()
            onOpenChange(false)
          },
        }
      )
    } else {
      createQuestion(
        {
          quizId,
          payload: data,
        },
        {
          onSuccess: () => {
            handleCloseOrCancel()
            onOpenChange(false)
          },
        }
      )
    }
  }

  if (isQuestionLoading) {
    return <Loader2 />
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          onOpenChange(false)
          handleCloseOrCancel()
        }}
      >
        <DialogContent className="w-full max-w-7xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <div className="flex items-center justify-between pr-7">
                  <DialogTitle>
                    {isEdit ? 'Sửa' : 'Tạo '} câu hỏi trắc nghiệm
                  </DialogTitle>
                  <DialogTitle>
                    {image ? (
                      <div className="relative">
                        <div onClick={openImageModal}>
                          <Image
                            src={image || ''}
                            width={40}
                            height={40}
                            className="size-12 cursor-pointer rounded-lg object-cover"
                            alt="Image description"
                          />
                        </div>
                        <button
                          className="absolute right-0 top-0 rounded-full bg-black/50 p-1 text-white"
                          onClick={handleDeleteImage}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <ImagePlus className="cursor-pointer" size={16} />
                      </label>
                    )}
                  </DialogTitle>
                </div>
                <DialogDescription>
                  Câu hỏi trắc nghiệm giúp học viên kiểm tra kiến thức.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name={`question`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Câu hỏi</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nhập câu hỏi" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <TinyEditor
                          value={field.value}
                          onEditorChange={field.onChange}
                          minimalist
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`answer_type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại đáp án</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex gap-4"
                        >
                          <Button
                            type="button"
                            variant={
                              field.value === 'single_choice'
                                ? 'default'
                                : 'outline'
                            }
                            onClick={() => field.onChange('single_choice')}
                          >
                            Một đáp án
                          </Button>
                          <Button
                            type="button"
                            variant={
                              field.value === 'multiple_choice'
                                ? 'default'
                                : 'outline'
                            }
                            onClick={() => field.onChange('multiple_choice')}
                          >
                            Nhiều đáp án
                          </Button>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`options`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đáp án</FormLabel>
                      <div className="flex gap-4">
                        {field.value.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`${colors[optionIndex]} relative min-h-[120px] rounded-lg p-6 text-white shadow-lg transition-transform hover:scale-[1.02]`}
                            style={{
                              flex: '1 1 0',
                              minWidth: 'calc(20% - 1rem)',
                            }}
                          >
                            {field.value.length > 2 && (
                              <button
                                className="absolute left-1 top-2 rounded bg-[#fff3] p-1 text-white/80 transition-colors hover:bg-[#ffffff54] hover:text-white"
                                onClick={() => handleDeleteAnswer(optionIndex)}
                                aria-label="Delete answer"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            )}
                            {form.watch(`answer_type`) === 'single_choice' ? (
                              <RadioGroup
                                value={String(
                                  field.value.findIndex((opt) => opt.is_correct) // Tìm index của đáp án đúng
                                )}
                                onValueChange={(value) =>
                                  handleSelectCorrectAnswer(Number(value))
                                }
                                className="absolute right-2 top-2"
                              >
                                <RadioGroupItem
                                  value={String(optionIndex)}
                                  id={`option-${optionIndex}`}
                                  className="border-white text-white data-[state=checked]:bg-white"
                                />
                              </RadioGroup>
                            ) : (
                              <Checkbox
                                checked={option.is_correct}
                                onCheckedChange={() =>
                                  handleToggleCorrectAnswer(optionIndex)
                                }
                                className="absolute right-2 top-2 flex size-5 items-center justify-center rounded border border-white/80 transition-colors hover:border-white"
                              >
                                {option.is_correct && (
                                  <Check className="size-4" />
                                )}
                              </Checkbox>
                            )}
                            <div className="flex h-full flex-col items-center justify-center">
                              <textarea
                                value={option.answer}
                                onChange={(e) =>
                                  handleChangeOption(
                                    optionIndex,
                                    e.target.value
                                  )
                                }
                                className="size-full resize-none bg-transparent text-center text-lg font-light text-white [-ms-overflow-style:none] [scrollbar-width:none] placeholder:text-white/90 focus:outline-none [&::-webkit-scrollbar]:hidden"
                                placeholder="Nhập đáp án"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                      <div className="mt-4">
                        {field.value.length < 5 && (
                          <Button
                            type="button"
                            onClick={() => handleAddAnswer()}
                            variant="outline"
                            className="mx-auto flex items-center gap-2"
                          >
                            <Plus className="size-4" />
                            Thêm đáp án
                          </Button>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    handleCloseOrCancel()
                    onOpenChange(false)
                  }}
                >
                  Hủy
                </Button>
                <Button
                  disabled={isQuestionCreatePending || isQuestionUpdatePending}
                  type="submit"
                >
                  {(isQuestionCreatePending || isQuestionUpdatePending) && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  {isEdit ? 'Cập nhật' : 'Thêm câu hỏi'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Dialog open={modalOpen} onOpenChange={closeImageModal}>
        <DialogContent className="h-[200px] w-full">
          <Image
            src={image || ''}
            alt="Modal Preview"
            layout="fill"
            className="h-[200px] w-full rounded-lg object-contain"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddQuestionDialog
