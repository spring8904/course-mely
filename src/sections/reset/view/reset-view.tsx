'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, KeyRound, Lock, ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'react-toastify'
import { useAuthStore } from '@/stores/useAuthStore'
import { ResetPasswordPayload, resetPasswordSchema } from '@/validations/auth'
import { useResetPassword } from '@/hooks/auth/useAuth'

const ResetView = ({ token }: { token: string }) => {
  const router = useRouter()

  const { isAuthenticated, role } = useAuthStore()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { mutate, isPending } = useResetPassword()

  const form = useForm<ResetPasswordPayload>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
    disabled: isPending,
  })

  useEffect(() => {
    if (!token) {
      router.replace('/not-found')
      return
    }

    if (isAuthenticated) {
      if (role === 'member') {
        router.replace('/')
      } else if (role === 'instructor') {
        router.replace('/instructor')
      }
      return
    }
  }, [isAuthenticated, role, router, token])

  const onSubmit = async (values: ResetPasswordPayload) => {
    const payload = {
      token,
      ...values,
    }
    mutate(payload, {
      onSuccess: (res: any) => {
        toast.success(res.message)
        form.reset()
        router.replace('/sign-in')
      },
      onError: (error: any) => {
        toast.error(error.message)
      },
    })
  }

  const primaryColor = '#E27447'
  const primaryLightColor = '#FFEEE8'

  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-white to-orange-50 p-12">
      <Card className="w-full max-w-lg overflow-hidden border-0 shadow-xl">
        <div
          className="h-2 bg-gradient-to-r from-orange-400 to-orange-600"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <CardHeader className="space-y-1 pt-8">
          <div className="mb-4 flex justify-center">
            <div
              className="rounded-full p-4"
              style={{ backgroundColor: primaryLightColor }}
            >
              <KeyRound className="size-10" style={{ color: primaryColor }} />
            </div>
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Đặt lại mật khẩu
          </CardTitle>
          <CardDescription className="px-6 text-center text-gray-500">
            Tạo mật khẩu mới an toàn để bảo vệ tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">
                      Mật khẩu mới
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Nhập mật khẩu mới"
                          type={showPassword ? 'text' : 'password'}
                          className="border-gray-300 pr-10 transition-all focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        </span>
                      </Button>
                    </div>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">
                      Xác nhận mật khẩu
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Xác nhận mật khẩu"
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="border-gray-300 pr-10 transition-all focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword
                            ? 'Ẩn mật khẩu'
                            : 'Hiện mật khẩu'}
                        </span>
                      </Button>
                    </div>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-6 w-full text-white transition-all"
                style={{
                  backgroundColor: primaryColor,
                  borderColor: primaryColor,
                  boxShadow: `0 4px 6px rgba(226, 116, 71, 0.25)`,
                }}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Đang xử lý...
                    </div>
                  </>
                ) : (
                  <span className="flex items-center justify-center py-0.5">
                    <Lock className="mr-2 size-4" /> Cập nhật mật khẩu
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-100">
          <Button
            disabled={isPending}
            variant="link"
            className="flex items-center text-sm font-medium"
            style={{ color: primaryColor }}
            onClick={() => router.push('/sign-in')}
          >
            <ArrowLeft className="mr-1 size-4" />
            Quay lại trang đăng nhập
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ResetView
