import { useState } from 'react'
import { Check, Plus, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type Props = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const AddQuestionDialog = ({ isOpen, onOpenChange }: Props) => {
  const [question, setQuestion] = useState('')
  // const [answers, setAnswers] = useState<string[]>(['', '', '', ''])
  // const [answerType, setAnswerType] = useState('single')
  // const [correctAnswer, setCorrectAnswer] = useState(null)
  // const [correctAnswers, setCorrectAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>()
  const [answerType, setAnswerType] = useState<'single' | 'multiple'>('single')
  const [answers, setAnswers] = useState([
    { id: '1', color: 'bg-[#2196F3]', text: '' },
    { id: '2', color: 'bg-[#26A69A]', text: '' },
    { id: '3', color: 'bg-[#FFA726]', text: '' },
    { id: '4', color: 'bg-[#EF5350]', text: '' },
  ])

  // const handleAddAnswer = () => {
  //   if (answers.length < 5) {
  //     setAnswers([...answers, ''])
  //   } else {
  //     toast.info('Số lượng đáp án tối đa là 5')
  //   }
  // }
  //
  // const handleRemoveAnswer = (index) => {
  //   const newAnswers = answers.filter((_, i) => i !== index)
  //   setAnswers(newAnswers)
  //
  //   if (answerType === 'single' && correctAnswer === index) {
  //     setCorrectAnswer(null)
  //   } else if (answerType === 'multiple') {
  //     setCorrectAnswers(correctAnswers.filter((i) => i !== index))
  //   }
  // }
  //
  // const handleAnswerChange = (index, value) => {
  //   const newAnswers = [...answers]
  //   newAnswers[index] = value
  //   setAnswers(newAnswers)
  // }
  const colors = [
    'bg-[#2196F3]',
    'bg-[#26A69A]',
    'bg-[#FFA726]',
    'bg-[#EF5350]',
    'bg-[#AB47BC]',
  ]

  const handleAddAnswer = () => {
    if (answers.length < 5) {
      const newAnswer = {
        id: (answers.length + 1).toString(),
        color: colors[answers.length],
        text: '',
      }
      setAnswers([...answers, newAnswer])
    }
  }

  const handleDeleteAnswer = (id: string) => {
    if (answers.length > 1) {
      setAnswers(answers.filter((answer) => answer.id !== id))
      if (selectedAnswer === id) {
        setSelectedAnswer(undefined)
      }
    }
  }

  const handleAnswerChange = (id: string, text: string) => {
    setAnswers(
      answers.map((answer) => (answer.id === id ? { ...answer, text } : answer))
    )
  }

  const handleSubmit = () => {
    console.log('Câu hỏi:', question)
    console.log('Đáp án:', answers)
    console.log('Loại đáp án:', answerType)
    console.log(
      'Đáp án đúng:',
      answerType === 'single' ? correctAnswer : correctAnswers
    )
    // onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-7xl">
        <DialogHeader>
          <DialogTitle>Thêm câu hỏi trắc nghiệm</DialogTitle>
          <DialogDescription>
            Câu hỏi trắc nghiệm giúp học viên kiểm tra kiến thức.
          </DialogDescription>
          <div className="space-y-2">
            <Label>Câu hỏi</Label>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Nhập câu hỏi"
            />
          </div>

          <div className="space-y-2">
            <Label>Loại đáp án</Label>
            <div className="flex gap-4">
              <Button
                variant={answerType === 'single' ? 'default' : 'outline'}
                onClick={() => setAnswerType('single')}
              >
                Một đáp án
              </Button>
              <Button
                variant={answerType === 'multiple' ? 'default' : 'outline'}
                onClick={() => setAnswerType('multiple')}
              >
                Nhiều đáp án
              </Button>
            </div>
          </div>

          {/*<div className="space-y-4">*/}
          {/*  <Label>Đáp án</Label>*/}
          {/*  {answers.map((answer, index) => (*/}
          {/*    <div key={index} className="flex items-center gap-4">*/}
          {/*      {answerType === 'single' ? (*/}
          {/*        <RadioGroup>*/}
          {/*          <RadioGroupItem*/}
          {/*            value={index.toString()}*/}
          {/*            checked={correctAnswer === index}*/}
          {/*            onChange={() => setCorrectAnswer(index)}*/}
          {/*          />*/}
          {/*        </RadioGroup>*/}
          {/*      ) : (*/}
          {/*        <Checkbox*/}
          {/*          checked={correctAnswers.includes(index)}*/}
          {/*          onCheckedChange={(checked) => {*/}
          {/*            if (checked) {*/}
          {/*              setCorrectAnswers([...correctAnswers, index])*/}
          {/*            } else {*/}
          {/*              setCorrectAnswers(*/}
          {/*                correctAnswers.filter((i) => i !== index)*/}
          {/*              )*/}
          {/*            }*/}
          {/*          }}*/}
          {/*        />*/}
          {/*      )}*/}

          {/*      <Input*/}
          {/*        value={answer}*/}
          {/*        onChange={(e) => handleAnswerChange(index, e.target.value)}*/}
          {/*        placeholder={`Nhập đáp án ${index + 1}`}*/}
          {/*      />*/}

          {/*      {answers.length > 2 && (*/}
          {/*        <Button*/}
          {/*          variant="ghost"*/}
          {/*          size="icon"*/}
          {/*          onClick={() => handleRemoveAnswer(index)}*/}
          {/*        >*/}
          {/*          <Trash2 className="size-4 text-red-500" />*/}
          {/*        </Button>*/}
          {/*      )}*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</div>*/}

          {/*{answers.length < 5 && (*/}
          {/*  <Button onClick={handleAddAnswer} variant="outline">*/}
          {/*    + Thêm đáp án*/}
          {/*  </Button>*/}
          {/*)}*/}
          <div className="space-y-4">
            <Label>Đáp án</Label>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {answers.map((answer) => (
                  <div
                    key={answer.id}
                    className={`${answer.color} relative min-h-[120px] rounded-lg p-6 text-white shadow-lg transition-transform hover:scale-[1.02]`}
                  >
                    <button
                      className="absolute left-2 top-2 text-white/80 transition-colors hover:text-white"
                      onClick={() => handleDeleteAnswer(answer.id)}
                      aria-label="Delete answer"
                    >
                      <Trash2 className="size-4" />
                    </button>
                    {answerType === 'single' ? (
                      <RadioGroup
                        value={selectedAnswer}
                        onValueChange={setSelectedAnswer}
                        className="absolute right-2 top-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={answer.id}
                            id={answer.id}
                            className="border-white text-white data-[state=checked]:bg-white"
                          />
                        </div>
                      </RadioGroup>
                    ) : (
                      <button
                        onClick={() => setSelectedAnswer(answer.id)}
                        className="absolute right-2 top-2 flex size-5 items-center justify-center rounded border border-white/80 transition-colors hover:border-white"
                      >
                        {selectedAnswer === answer.id && (
                          <Check className="size-4" />
                        )}
                      </button>
                    )}
                    <div className="flex h-full flex-col items-center justify-center">
                      <textarea
                        value={answer.text}
                        onChange={(e) =>
                          handleAnswerChange(answer.id, e.target.value)
                        }
                        className="size-full resize-none bg-transparent text-center text-lg font-light text-white [-ms-overflow-style:none] [scrollbar-width:none] placeholder:text-white/90 focus:outline-none [&::-webkit-scrollbar]:hidden"
                        placeholder="Nhập đán của bạn"
                      />
                    </div>
                  </div>
                ))}
              </div>
              {answers.length < 5 && (
                <Button
                  onClick={handleAddAnswer}
                  variant="outline"
                  className="mx-auto flex items-center gap-2"
                >
                  <Plus className="size-4" />
                  Thêm đáp án
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button onClick={handleSubmit}>Thêm câu hỏi</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddQuestionDialog
