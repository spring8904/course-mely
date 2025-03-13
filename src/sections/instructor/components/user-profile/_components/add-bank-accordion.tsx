'use client'
import { BankInfo, bankInfoSchema } from '@/validations/bank'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronDown, Loader2 } from 'lucide-react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
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
import { useGetSupportBanks } from '@/hooks/support-bank/useSupportBank'
import { cn } from '@/lib/utils'
import { useAddBank } from '@/hooks/user/use-bank'

const AddBankAccordion = () => {
  const { data, isLoading } = useGetSupportBanks()

  const banks = useMemo(() => {
    return (
      data?.map((bank) => ({
        label: bank.short_name,
        value: bank.bin,
      })) || []
    )
  }, [data])

  const { isPending, mutate } = useAddBank()

  const form = useForm<BankInfo>({
    resolver: zodResolver(bankInfoSchema.omit({ id: true })),
    defaultValues: {
      account_name: '',
      account_no: '',
    },
    disabled: isPending,
  })

  const onSubmit = (values: Omit<BankInfo, 'id'>) => {
    mutate(values, {
      onSuccess: () => form.reset(),
    })
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="rounded-lg">
          Thêm tài khoản ngân hàng
        </AccordionTrigger>
        <AccordionContent className="rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name={'acq_id'}
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
                            {field.value
                              ? banks.find((bank) => bank.value === field.value)
                                  ?.label
                              : 'Chọn ngân hàng'}
                            <ChevronDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Tìm kiếm"
                            className="h-9"
                          />
                          <CommandList>
                            {isLoading ? (
                              <CommandEmpty>Đang tải dữ liệu...</CommandEmpty>
                            ) : (
                              <CommandEmpty>Không có kết quả</CommandEmpty>
                            )}

                            <CommandGroup>
                              {banks.map((bank) => (
                                <CommandItem
                                  value={bank.label}
                                  key={bank.value}
                                  onSelect={() => {
                                    field.onChange(bank.value)
                                    form.setValue('bank_name', bank.label)
                                  }}
                                >
                                  {bank.label}
                                  <Check
                                    className={cn(
                                      'ml-auto',
                                      bank.value === field.value
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
              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="animate-spin" />}
                  Lưu
                </Button>
              </div>
            </form>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
export default AddBankAccordion
