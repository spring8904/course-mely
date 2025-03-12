'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CircleAlert, Loader2 } from 'lucide-react'
import { AlertDescription } from '@/components/ui/alert'
import { useForgotPassword } from '@/hooks/auth/useAuth'

interface ForgotPasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const { mutate, isPending } = useForgotPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
    },
    disabled: isPending,
  })

  const onSubmit = async (data: { email: string }) => {
    setApiError(null)

    mutate(data.email, {
      onSuccess: () => {
        setIsSuccess(true)
        reset()
      },
      onError: (error: any) => {
        setApiError(error.message)
      },
    })
  }

  const handleOpenChange = (open: boolean) => {
    if (!isPending) {
      onOpenChange(open)
      setIsSuccess(false)
      setApiError(null)
      reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Quên mật khẩu</DialogTitle>
          <DialogDescription>
            Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn liên kết để
            đặt lại mật khẩu.
          </DialogDescription>
        </DialogHeader>

        {apiError && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/50 p-3 px-4 text-sm text-destructive dark:border-destructive [&>svg]:text-destructive">
            <CircleAlert size="16" />
            <AlertDescription className="grow">{apiError}</AlertDescription>
          </div>
        )}

        {isSuccess ? (
          <div className="text-center">
            <div className="mb-4 flex justify-center text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <p className="mb-4">
              Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.
            </p>
            <DialogClose asChild>
              <Button>Đóng</Button>
            </DialogClose>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="Nhập email của bạn"
                {...register('email', {
                  required: 'Vui lòng nhập email',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email không hợp lệ',
                  },
                })}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button disabled={isPending} type="button" variant="outline">
                  Hủy
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Đang gửi...
                  </>
                ) : (
                  'Gửi'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ForgotPasswordDialog
