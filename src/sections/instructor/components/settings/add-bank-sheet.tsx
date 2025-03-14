'use client'
import { BankInfo, bankInfoSchema } from '@/validations/bank'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronDown, Loader2, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useGetSupportBanks } from '@/hooks/support-bank/useSupportBank'
import { useAddBank } from '@/hooks/user/use-bank'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const AddBankSheet = () => {
  const { data, isLoading } = useGetSupportBanks()

  const { isPending, mutate } = useAddBank()

  const form = useForm<BankInfo>({
    resolver: zodResolver(bankInfoSchema.omit({ id: true })),
    defaultValues: {
      account_name: '',
      account_no: '',
      is_default: false,
    },
    disabled: isPending,
  })

  const onSubmit = (values: Omit<BankInfo, 'id'>) => {
    mutate(values, {
      onSuccess: () => form.reset(),
    })
  }

  return (
    <Sheet onOpenChange={(isOpen) => !isOpen && form.reset()}>
      <SheetTrigger asChild>
        <Button>
          <Plus />
          Thêm tài khoản
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-lg">
        <SheetHeader>
          <SheetTitle>Thêm tài khoản ngân hàng</SheetTitle>
          <SheetDescription>Tối đa 3 tài khoản ngân hàng</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-4"
          >
            <FormField
              control={form.control}
              name={'bin'}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngân hàng</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                          disabled={field.disabled}
                        >
                          {(() => {
                            const bank = (data || []).find(
                              (bank) => bank.bin === field.value
                            )
                            return bank ? (
                              <div className="flex items-center gap-2">
                                <Image
                                  src={bank.logo_rounded}
                                  alt={bank.short_name}
                                  width={20}
                                  height={20}
                                  className="size-5 shrink-0 rounded-full"
                                />
                                <span>{bank.short_name}</span>
                              </div>
                            ) : (
                              'Chọn ngân hàng'
                            )
                          })()}
                          <ChevronDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                      <Command>
                        <CommandInput placeholder="Tìm kiếm" className="h-9" />
                        <CommandList>
                          {isLoading ? (
                            <CommandEmpty>Đang tải dữ liệu...</CommandEmpty>
                          ) : (
                            <CommandEmpty>Không có kết quả</CommandEmpty>
                          )}

                          <CommandGroup>
                            {(data || []).map((bank) => (
                              <CommandItem
                                value={bank.short_name}
                                key={bank.bin}
                                onSelect={() => {
                                  form.setValue('bin', bank.bin)
                                  form.setValue('name', bank.name)
                                  form.setValue('short_name', bank.short_name)
                                  form.setValue('logo', bank.logo)
                                  form.setValue(
                                    'logo_rounded',
                                    bank.logo_rounded
                                  )
                                }}
                                className="border-b last:border-b-0"
                              >
                                <div className="flex items-center gap-3">
                                  <Image
                                    src={bank.logo_rounded}
                                    alt={bank.short_name}
                                    width={32}
                                    height={32}
                                    className="size-8 shrink-0 rounded-full"
                                  />
                                  <div>
                                    <div className="text-base font-medium">
                                      {bank.short_name}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      {bank.name}
                                    </p>
                                  </div>
                                </div>
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    bank.bin === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="account_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số tài khoản</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập số tài khoản" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="account_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Chủ tài khoản{' '}
                    <span className="text-xs text-muted-foreground">
                      (Viết in hoa, không dấu)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên tài khoản" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_default"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Đặt làm mặc định</FormLabel>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="animate-spin" />}
                Thêm tài khoản
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
export default AddBankSheet
