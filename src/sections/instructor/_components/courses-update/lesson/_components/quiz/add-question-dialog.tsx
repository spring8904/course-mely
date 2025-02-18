import { useState } from 'react'
import { Trash2 } from 'lucide-react'
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
  const [answers, setAnswers] = useState<string[]>(['', '', '', ''])
  const [answerType, setAnswerType] = useState('single')
  const [correctAnswer, setCorrectAnswer] = useState(null)
  const [correctAnswers, setCorrectAnswers] = useState([])

  const handleAddAnswer = () => {
    if (answers.length < 5) {
      setAnswers([...answers, ''])
    } else {
      toast.info('Số lượng đáp án tối đa là 5')
    }
  }

  const handleRemoveAnswer = (index) => {
    const newAnswers = answers.filter((_, i) => i !== index)
    setAnswers(newAnswers)

    if (answerType === 'single' && correctAnswer === index) {
      setCorrectAnswer(null)
    } else if (answerType === 'multiple') {
      setCorrectAnswers(correctAnswers.filter((i) => i !== index))
    }
  }

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
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

          <div className="space-y-4">
            <Label>Đáp án</Label>
            {answers.map((answer, index) => (
              <div key={index} className="flex items-center gap-4">
                {answerType === 'single' ? (
                  <RadioGroup>
                    <RadioGroupItem
                      value={index.toString()}
                      checked={correctAnswer === index}
                      onChange={() => setCorrectAnswer(index)}
                    />
                  </RadioGroup>
                ) : (
                  <Checkbox
                    checked={correctAnswers.includes(index)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setCorrectAnswers([...correctAnswers, index])
                      } else {
                        setCorrectAnswers(
                          correctAnswers.filter((i) => i !== index)
                        )
                      }
                    }}
                  />
                )}

                <Input
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder={`Nhập đáp án ${index + 1}`}
                />

                {answers.length > 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveAnswer(index)}
                  >
                    <Trash2 className="size-4 text-red-500" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {answers.length < 5 && (
            <Button onClick={handleAddAnswer} variant="outline">
              + Thêm đáp án
            </Button>
          )}
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
