'use client'

import { Info, Trash } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { UpdateCodingLessonPayload } from '@/validations/course'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import TinyEditor from '@/components/shared/tiny-editor'

interface Props {
  form: UseFormReturn<UpdateCodingLessonPayload>
}

const GuideTab = ({ form }: Props) => {
  const hints = form.watch('hints') || ['']

  const handleRemoveHint = (index: number) => {
    const newHints = hints.filter((_, i) => i !== index)
    form.setValue('hints', newHints)
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={30}>
        <FormField
          control={form.control}
          name="solution_code"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col space-y-0">
              <FormLabel className="flex h-14 items-center gap-2 border-b px-4 py-2 text-lg font-bold">
                Hướng dẫn
                <Info size={18} />
              </FormLabel>

              <div className="flex flex-1 flex-col space-y-2 p-4">
                <FormDescription className="text-base">
                  Cung cấp các hướng dẫn để học viên biết họ đang giải quyết vấn
                  đề gì. Sử dụng ngôn từ chính xác, đúng ngữ pháp và tránh thành
                  kiến.
                </FormDescription>

                <div className="flex-1">
                  <FormControl>
                    <TinyEditor
                      value={field.value}
                      onEditorChange={field.onChange}
                      init={{
                        height: '100%',
                        resize: false,
                      }}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </ResizablePanel>
      <ResizableHandle />

      <ResizablePanel minSize={30}>
        <FormField
          control={form.control}
          name="hints"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col space-y-0">
              <FormLabel className="flex h-14 items-center gap-2 border-b px-4 py-2 text-lg font-bold">
                Gợi ý
                <Info size={18} />
              </FormLabel>

              <div className="flex-1 space-y-2 overflow-y-auto p-4 scrollbar-thin">
                <FormDescription className="text-base">
                  Các gợi ý sẽ được mở khóa sau lần thực hiện thất bại thứ hai
                  để học viên có thể nhận được nhiều hỗ trợ hơn ngoài các bài
                  giảng và bài kiểm tra liên quan.
                </FormDescription>

                <FormControl className="space-y-3">
                  <div>
                    {hints.map((hint, index) => (
                      <div key={index} className="relative">
                        <Input
                          placeholder={`Nhập gợi ý thứ ${index + 1}`}
                          value={hint}
                          onChange={(e) => {
                            const newHints = [...hints]
                            newHints[index] = e.target.value

                            if (
                              index === newHints.length - 1 &&
                              e.target.value.trim() !== '' &&
                              index < 9
                            ) {
                              newHints.push('')
                            }

                            field.onChange(newHints)
                          }}
                        />
                        {hints.length > 1 && (
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500"
                            onClick={() => handleRemoveHint(index)}
                          >
                            <Trash size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default GuideTab
