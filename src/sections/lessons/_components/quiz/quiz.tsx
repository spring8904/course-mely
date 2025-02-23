import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { ILesson, IQuiz } from '@/types'
import { useGetQuiz } from '@/hooks/instructor/quiz/useQuiz'

type Props = {
  lesson: ILesson
}

export const Quiz = ({ lesson }: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [score, setScore] = useState<number>(0)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [answerStatus, setAnswerStatus] = useState<{ [key: number]: string }>(
    {}
  )

  const { data: quizData, isLoading } = useGetQuiz(
    lesson?.lessonable_id?.toString() ?? ''
  )

  useEffect(() => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setScore(0)
    setIsCorrect(null)
    setAnswerStatus({})
  }, [lesson])

  if (isLoading)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader2 className="mx-auto size-10 animate-spin" />
      </div>
    )
  if (!quizData || !quizData?.data?.questions?.length)
    return <p>Không có câu hỏi nào.</p>

  const question: IQuiz = quizData.data.questions[currentQuestion]
  const updatedAt = new Date(quizData.data.updated_at)

  const handleAnswerClick = (answerId: number) => {
    if (question.answer_type === 'single_choice') {
      setSelectedAnswers([answerId])
    } else {
      setSelectedAnswers((prev) =>
        prev.includes(answerId)
          ? prev.filter((id) => id !== answerId)
          : [...prev, answerId]
      )
    }
  }

  const checkAnswer = () => {
    const correctAnswers = question.answers
      .filter((a: any) => a.is_correct === 1)
      .map((a: any) => a.id)

    const selectedSet = new Set(selectedAnswers)
    const correctSet = new Set(correctAnswers)

    const isAnswerCorrect =
      selectedSet.size === correctSet.size &&
      Array.from(selectedSet).every((id) => correctSet.has(id))

    setIsCorrect(isAnswerCorrect)

    if (isAnswerCorrect) {
      setScore(score + 1)
    }

    const newAnswerStatus: { [key: number]: string } = {}
    question.answers.forEach((answer: any) => {
      if (selectedSet.has(answer.id)) {
        newAnswerStatus[answer.id] = correctSet.has(answer.id)
          ? 'bg-orange-400'
          : 'bg-red-400'
      }
    })
    setAnswerStatus(newAnswerStatus)
  }

  const handleNextQuestion = () => {
    if (isCorrect) {
      setIsCorrect(null)
      setSelectedAnswers([])
      setAnswerStatus({})
      if (currentQuestion < quizData.data.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      }
    }
  }

  return (
    <div className="mx-auto w-3/5">
      <h2 className="my-5 text-xl font-bold">{lesson?.title}</h2>
      <p className="my-3 text-xs font-normal">
        Cập nhật tháng {updatedAt.getMonth() + 1} năm {updatedAt.getFullYear()}
      </p>
      <p className="mb-4 text-gray-600">
        Câu {currentQuestion + 1} / {quizData.data.questions.length}{' '}
        <span className="font-semibold">
          (
          {question.answer_type === 'single_choice'
            ? 'Chọn 1 đáp án'
            : 'Chọn nhiều đáp án'}
          )
        </span>
      </p>

      <h3 className="mb-8 text-lg font-semibold">{question.question}</h3>

      <div className="space-y-5">
        {question.answers.map((answer: any) => (
          <label
            key={answer.id}
            className={`flex cursor-pointer items-center space-x-2 rounded-md p-4 text-lg shadow ${
              answerStatus[answer.id] || 'bg-white'
            }`}
          >
            <input
              type={
                question.answer_type === 'single_choice' ? 'radio' : 'checkbox'
              }
              name={`question-${question.id}`}
              value={answer.id}
              checked={selectedAnswers.includes(answer.id)}
              onChange={() => handleAnswerClick(answer.id)}
              disabled={isCorrect !== null}
            />
            <p>{answer.answer}</p>
          </label>
        ))}
      </div>

      {isCorrect !== null && (
        <p
          className={`mt-3 text-lg font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
        >
          {isCorrect ? 'Chính xác! 🎉' : 'Sai rồi! 😢 Hãy thử lại.'}
        </p>
      )}

      <div className="mt-4">
        {isCorrect === null ? (
          <button
            className="rounded-lg bg-blue-500 px-6 py-2 text-white disabled:bg-gray-300"
            onClick={checkAnswer}
            disabled={selectedAnswers.length === 0}
          >
            Kiểm tra đáp án
          </button>
        ) : isCorrect ? (
          <button
            className="rounded-lg bg-green-500 px-6 py-2 text-white"
            onClick={handleNextQuestion}
          >
            Tiếp tục
          </button>
        ) : (
          <button
            className="rounded-lg bg-red-500 px-6 py-2 text-white"
            onClick={() => {
              setIsCorrect(null)
              setAnswerStatus({})
            }}
          >
            Thử lại
          </button>
        )}
      </div>
    </div>
  )
}
