import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { KeyRound, Loader2, Lock, ShieldCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { useChangePassword } from '@/hooks/change-password/useChangePassword'
import {
  ChangePasswordPayload,
  changePasswordSchema,
} from '@/validations/change-password'

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
import { PasswordInput } from '@/components/ui/password-input'

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
    mutate(data, {
      onSuccess: () => {
        form.reset()
      },
    })
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-3xl">
      <Card className="overflow-hidden border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-lg">
        <CardHeader className="border-b bg-slate-50 pb-5 pt-6">
          <div className="mb-1 flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <ShieldCheck className="size-5 text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold">
              Bảo mật tài khoản
            </CardTitle>
          </div>
          <CardDescription className="text-sm text-muted-foreground">
            Cập nhật mật khẩu mới để tăng cường bảo mật cho tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-7">
          <div className="mx-auto max-w-2xl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="old_password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1.5 text-sm font-medium">
                            <KeyRound className="size-3.5 text-muted-foreground" />
                            Mật khẩu hiện tại
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <PasswordInput
                                placeholder="Nhập mật khẩu"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="new_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-sm font-medium">
                          <Lock className="size-3.5 text-muted-foreground" />
                          Mật khẩu mới
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Nhập mật khẩu"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirm_new_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-sm font-medium">
                          <Lock className="size-3.5 text-muted-foreground" />
                          Xác nhận mật khẩu mới
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Nhập mật khẩu"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-6 border-t pt-2">
                  <div className="mx-auto mt-4 flex flex-col justify-end gap-3 sm:mx-0 sm:flex-row">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                    >
                      Nhập lại
                    </Button>
                    <Button
                      type="submit"
                      className="group relative gap-2 overflow-hidden py-2.5"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <motion.div
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ShieldCheck className="size-4" />
                        </motion.div>
                      )}
                      <span>Cập nhật</span>
                      <div className="absolute inset-0 translate-y-full bg-white/10 transition-transform duration-300 group-hover:translate-y-0" />
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-between border-t bg-slate-50/50 px-6 py-4 text-xs text-muted-foreground sm:flex-row">
          <div className="mb-2 flex items-center gap-1 sm:mb-0">
            <Lock className="size-3.5" />
            <span>Mật khẩu của bạn được mã hóa và bảo vệ an toàn</span>
          </div>
          <div>Cập nhật lần cuối: {new Date().toLocaleDateString()}</div>
        </CardFooter>
      </Card>
    </div>
  )
}
