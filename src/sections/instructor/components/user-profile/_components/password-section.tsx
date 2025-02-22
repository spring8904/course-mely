import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import {
  ChangePasswordPayload,
  changePasswordSchema,
} from '@/validations/change-password'
import { useChangePassword } from '@/hooks/change-password/useChangePassword'

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

export function PasswordSection() {
  const { mutate, isPending } = useChangePassword()
  const form = useForm<ChangePasswordPayload>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_new_password: '',
    },
  })

  function onSubmit(data: ChangePasswordPayload) {
    mutate(data)
    form.reset()
  }

  return (
    <div className="max-w-md">
      <div className="rounded-lg border">
        <div className="border-b p-3">
          <h4 className="font-medium">Đổi mật khẩu</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Cập nhật mật khẩu mới
          </p>
        </div>
        <div className="p-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="old_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu hiện tại</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Nhập mật khẩu hiện tại của bạn"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu mới</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Nhập mật khẩu mới của bạn"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Nhập lại mật khẩu mới của bạn"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 pt-2">
                <Button type="submit" className="flex-1">
                  {isPending && <Loader2 className="animate-spin" />} Cập nhật
                  mật khẩu mới
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset()
                  }}
                >
                  Nhập lại
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
