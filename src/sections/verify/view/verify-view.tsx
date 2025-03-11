'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, XCircle, Mail } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'

const VerifyView = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { isAuthenticated, role } = useAuthStore()

  const status = searchParams.get('status')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      if (role === 'member') {
        router.replace('/')
      } else if (role === 'instructor') {
        router.replace('/instructor')
      }
      return
    }

    if (!status) {
      router.replace('/')
    } else {
      setLoading(false)
    }
  }, [status, router, isAuthenticated])

  if (loading) return null

  const renderContent = () => {
    switch (status) {
      case 'success':
        return (
          <>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 rounded-full bg-green-100 p-3">
                <CheckCircle className="size-12 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">
                Xác minh thành công!
              </CardTitle>
              <CardDescription>
                Xác minh email thành công! Tài khoản của bạn đã được kích hoạt.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="border-green-200 bg-green-50">
                <AlertTitle>Tài khoản đã được kích hoạt</AlertTitle>
                <AlertDescription>
                  Bạn có thể đăng nhập và bắt đầu sử dụng tài khoản của mình
                  ngay bây giờ.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button onClick={() => router.push('/sign-in')}>
                Đăng nhập ngay
              </Button>
              <Button variant="outline" onClick={() => router.push('/')}>
                Về trang chủ
              </Button>
            </CardFooter>
          </>
        )

      case 'error':
      case 'fail':
        return (
          <>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 rounded-full bg-red-100 p-3">
                <XCircle className="size-12 text-red-600" />
              </div>
              <CardTitle className="text-2xl text-red-600">
                Xác minh không thành công
              </CardTitle>
              <CardDescription>
                Xác minh email không thành công. Vui lòng thử lại sau.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertTitle>Không thể xác minh email</AlertTitle>
                <AlertDescription>
                  Liên kết xác minh có thể đã hết hạn hoặc không hợp lệ. Vui
                  lòng thử gửi lại email xác minh.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button className="w-full sm:w-auto">
                <Mail className="mr-2 size-4" />
                Gửi lại email xác minh
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/sign-in')}
                className="w-full sm:w-auto"
              >
                Về trang đăng nhập
              </Button>
            </CardFooter>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <Card className="w-full border-t-4 border-t-primary shadow-lg">
          {renderContent()}
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Gặp vấn đề?{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Liên hệ hỗ trợ
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyView
