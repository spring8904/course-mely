import { useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { AnswerType, ILesson } from '@/types'
import {
  QuizSubmissionPayload,
  quizSubmissionSchema,
} from '@/validations/quiz-submission'
import { formatDate } from '@/lib/common'
import { cn } from '@/lib/utils'
import { useCompleteLesson } from '@/hooks/learning-path/useLearningPath'

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type Props = {
  lesson: ILesson
  isCompleted: boolean
}

const QuizLesson = ({ lesson, isCompleted }: Props) => {
  const { lessonable: quizData } = lesson
  const { questions = [] } = quizData!

  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [isCorrect, setIsCorrect] = useState<{
    [key: number]: boolean
  }>({})
  const [answerStatus, setAnswerStatus] = useState<{
    [key: number]: { [key: number]: string }
  }>({})

  const form = useForm<QuizSubmissionPayload>({
    resolver: zodResolver(quizSubmissionSchema),
    defaultValues: {
      quiz_id: lesson.lessonable_id,
      answers: questions.map((question) => ({
        question_id: question.id,
        answer_id: [],
      })),
    },
  })

  const { mutate: completeLesson, isPending } = useCompleteLesson()

  const handleAnswerChange = () => {
    setIsCorrect({
      ...isCorrect,
      [currentQuestion]: false,
    })
    setAnswerStatus({
      ...answerStatus,
      [currentQuestion]: {},
    })
  }

  const checkAnswer = () => {
    const allAnswers = questions[currentQuestion].answers
    const selectedAnswers = form.getValues().answers[currentQuestion].answer_id

    const correctAnswers = allAnswers
      ?.filter((answer) => answer.is_correct === 1)
      .map((answer) => answer.id)

    const selectedSet = new Set(
      Array.isArray(selectedAnswers) ? selectedAnswers : [selectedAnswers]
    )
    const correctSet = new Set(correctAnswers)

    const isAnswerCorrect =
      selectedSet.size === correctSet.size &&
      Array.from(selectedSet).every((id) => correctSet.has(id))

    setIsCorrect({
      ...isCorrect,
      [currentQuestion]: isAnswerCorrect,
    })

    const newAnswerStatus: { [key: number]: string } = {}
    allAnswers?.forEach((answer) => {
      if (selectedSet.has(answer.id!)) {
        newAnswerStatus[answer.id!] = answer.is_correct
          ? 'bg-green-100 border-green-500'
          : 'bg-red-100 border-red-500'
      }
    })
    setAnswerStatus({
      ...answerStatus,
      [currentQuestion]: newAnswerStatus,
    })
  }

  const isCorrectAll = useMemo(() => {
    return (
      Object.values(isCorrect).every((correct) => correct) &&
      Object.keys(isCorrect).length === questions.length
    )
  }, [isCorrect, questions.length])

  const onSubmit = (values: QuizSubmissionPayload) => {
    completeLesson({
      lesson_id: lesson.id!,
      ...values,
    })
  }

  if (!quizData || !questions.length) return <p>Không có câu hỏi nào.</p>

  return (
    <div className="mx-16 mb-40 mt-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
        <p className="text-sm text-muted-foreground">
          Cập nhật{' '}
          {formatDate(lesson.updated_at, {
            dateStyle: 'long',
          })}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {quizData.questions?.map((question, questionIndex) => (
            <div
              key={question.id!}
              className={cn(currentQuestion !== questionIndex && 'hidden')}
            >
              Câu hỏi {currentQuestion + 1}:{' '}
              {question.answer_type === AnswerType.MultipleChoice && (
                <span className="text-sm text-muted-foreground">
                  (Chọn nhiều đáp án)
                </span>
              )}
              <h3 className="text-lg font-semibold">{question.question}</h3>
              <div className="mt-4">
                {question.answer_type === AnswerType.OneChoice ? (
                  <FormField
                    control={form.control}
                    name={`answers.${questionIndex}.answer_id`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            className="gap-4"
                            onValueChange={(value) => {
                              field.onChange(parseInt(value))
                              field.onBlur()
                              handleAnswerChange()
                            }}
                            defaultValue={field.value?.toString()}
                          >
                            {question.answers.map(
                              (answer, answerIndex: number) => (
                                <FormItem key={answerIndex}>
                                  <FormLabel
                                    className={cn(
                                      'flex cursor-pointer items-center space-x-4 rounded border p-4 font-normal',
                                      answerStatus[currentQuestion]?.[
                                        answer.id!
                                      ]
                                    )}
                                  >
                                    <FormControl>
                                      <RadioGroupItem
                                        value={answer.id!.toString()}
                                      />
                                    </FormControl>
                                    <span>{answer.answer}</span>
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
                    name={`answers.${questionIndex}.answer_id`}
                    render={() => (
                      <FormItem className="space-y-4">
                        {question.answers.map((answer) => (
                          <FormField
                            key={`${question.id}-${answer.id}`}
                            control={form.control}
                            name={`answers.${questionIndex}.answer_id`}
                            render={({ field }) => {
                              const value = field.value as number[]
                              return (
                                <FormItem key={`${question.id}-${answer.id}`}>
                                  <FormLabel
                                    className={cn(
                                      'flex cursor-pointer items-center space-x-4 rounded border p-4 font-normal',
                                      answerStatus[currentQuestion]?.[
                                        answer.id!
                                      ]
                                    )}
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={value.includes(answer.id!)}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            field.onChange([
                                              ...value,
                                              answer.id,
                                            ])
                                          } else {
                                            field.onChange(
                                              value?.filter(
                                                (value) => value !== answer.id
                                              )
                                            )
                                          }
                                          handleAnswerChange()
                                          field.onBlur()
                                        }}
                                      />
                                    </FormControl>
                                    <span>{answer.answer}</span>
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
            </div>
          ))}
          {/*  */}

          <div className="mt-4 flex justify-between">
            {currentQuestion > 0 && (
              <Button
                variant="secondary"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Quay lại
              </Button>
            )}

            {isCorrect[currentQuestion] ? (
              currentQuestion < questions.length - 1 && (
                <Button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                  Tiếp tục
                </Button>
              )
            ) : (
              <Button onClick={checkAnswer}>Kiểm tra đáp án</Button>
            )}

            {!isCompleted && isCorrectAll && (
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="animate-spin" />}
                Nộp bài
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default QuizLesson
