import React, { useState } from 'react'
import { Loader2, Star } from 'lucide-react'
import { toast } from 'react-toastify'

import { useStoreRating } from '@/hooks/rating/useRating'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const EvaluationCourse = ({ courseSlug }: { courseSlug: string }) => {
  const [rating, setRating] = useState<number>(0)
  const [feedback, setFeedback] = useState<string>('')
  const [open, setOpen] = useState(false)

  const { mutate, isPending } = useStoreRating()

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex)
  }

  const handleSubmit = () => {
    if (feedback.trim() === '') {
      toast.warning('Vui lòng nhập nội dung đánh giá')
      return
    }

    const payload = {
      course_slug: courseSlug,
      rate: rating,
      content: feedback,
    }

    mutate(payload, {
      onSuccess: (res: any) => {
        toast.success(res.message)
        setOpen(false)
        setRating(0)
        setFeedback('')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-2xl">
            <Star />
            Đánh giá
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Đánh giá khoá học</DialogTitle>
            <DialogDescription>
              Hãy để lại đánh giá của bạn về khoá học này.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="flex items-center justify-start gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  className={`cursor-pointer ${
                    star <= rating ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="feedback">Nội dung đánh giá</Label>
              <Textarea
                id="feedback"
                placeholder="Hãy cho chúng tôi biết về trải nghiệm của bạn..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="h-40 w-full resize-none rounded-lg border p-3 focus:ring-2 focus:ring-secondary"
              ></Textarea>
            </div>
          </div>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                onClick={() => {
                  setRating(0)
                  setFeedback('')
                }}
                disabled={isPending}
              >
                Huỷ
              </Button>
            </DialogTrigger>
            <Button disabled={isPending} type="submit" onClick={handleSubmit}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" /> Đang gửi...
                </>
              ) : (
                'Gửi đánh giá'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EvaluationCourse
